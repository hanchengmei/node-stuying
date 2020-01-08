/**
 * @description user 业务逻辑处理，调用server层获取数据，然后统一返回格式
 */
const { getUserInfo } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')


/**
 * 判断用户名是否存在
 * @param(string) userName 用户名
 * @returns {Promise<void>}
 */
async function isExist(userName) {
    console.log('isExist', userName)

    const userInfo = await getUserInfo(userName)
    // 统一返回数据格式
    if(userInfo) {
        // 用户存在
        return new SuccessModel(userInfo)
    } else {
        // 用户不存在
        return new ErrorModel({
            errno: 1001,
            message: '用户名不存在'
        })
    }
}

module.exports = {
    isExist
}