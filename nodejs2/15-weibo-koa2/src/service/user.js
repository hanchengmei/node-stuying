/**
 * @description user 数据处理层
 * 查询数据库，格式化获取的结果，并返回给业务逻辑层
 */
const { User } = require('../db/model/index')
const { formatUserList } = require('./_format')

/**
 * 获取用户信息
 * 可用于查询用户名是否存在，或者注册查询，或者登陆
 * @param(string) userName 用户名
 * @param(string) password 密码
 */
async function getUserInfo(userName, password) {
    const whereOption = {
        userName
    }
    if (password) {
        Object.assign(whereOption, {password})
    }
    console.log('whereOption', whereOption)
    const result = await User.findOne({
        attributes: ['userName', 'nickName', 'gender', 'picture', 'city'],
        where: whereOption

    })
    console.log('数据库查询结果',result)
    if (result === null) {
        // 未查询到
        return result
    }
    return formatUserList(result.dataValues)

}

module.exports = {
    getUserInfo
}