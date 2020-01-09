/**
 * @description user 业务逻辑处理，调用server层获取数据，然后统一返回格式
 */
const { getUserInfo, createUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const doCrypto = require('../utils/cryp')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo
} = require('../model/ErrorInfo')


/**
 * 判断用户名是否存在
 * @param {string} userName 用户名
 * @returns {Promise<void>}
 */
async function isExist(userName) {
 const userInfo = await getUserInfo(userName)
    // 统一返回数据格式
    if(userInfo) {
        // 用户存在
        return new SuccessModel(userInfo)
    } else {
        // 用户不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 *注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1 男，2 女，3 保密）
 * @returns {Promise<*>}
 */
async function register({userName, password, gender}) {
    const userInfo = await getUserInfo(userName, userName)
    if (userInfo) {
        // 用户已存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    try {
        await createUser({
            userName,
            password: doCrypto(password), // 加密
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex)
        return ErrorModel(registerFailInfo)
    }
}

module.exports = {
    isExist,
    register
}