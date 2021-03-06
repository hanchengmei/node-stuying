/**
 * @description user 数据处理层
 * 查询数据库，格式化获取的结果，并返回给业务逻辑层
 */
const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
const { addFollower } = require('./user-relation')

/**
 * 获取用户信息
 * 可用于查询用户名是否存在，或者注册查询，或者登陆
 * @param(string) userName 用户名
 * @param(string) password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOption = {
        userName
    }
    if (password) {
        Object.assign(whereOption, {password})
    }
    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'gender', 'picture', 'city'],
        where: whereOption

    })
    if (result === null) {
        // 未查询到
        return result
    }
    // 查询到并格式化
    return formatUser(result.dataValues)

}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 * @returns {Promise<void>}
 */
async function createUser({userName, password, gender = 3, nickName}) {
    const result = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : userName
    })
    const data = result.dataValues

    // 自己关注自己（为了方便首页获取数据）
    addFollower(data.id, data.id)

    return data
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 { newNickName, newPassword, newCity, newPicture}
 * @param {Object} param1 查询条件 { nickName, password }
 * @returns {Promise<void>}
 */
async function updateUser(
    { newNickName, newPassword, newCity, newPicture},
    { userName, password }
) {
    // 拼接修改参数
    let params = {}
    if (newNickName) {
        params.nickName = newNickName
    }
    if (newPassword) {
        params.password = newPassword
    }
    if (newCity) {
        params.city = newCity
    }
    if (newPicture) {
        params.picture = newPicture
    }

    // 拼接查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        whereOpt.password = password
    }

    // 修改
    const result = await User.update(params, {
        where: whereOpt
    })
    // result：[1] 改变的行数
    return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    updateUser
}