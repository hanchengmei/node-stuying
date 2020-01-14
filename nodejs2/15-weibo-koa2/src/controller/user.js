/**
 * @description user 业务逻辑处理，调用server层获取数据，然后统一返回格式
 */
const { getUserInfo, createUser, deleteUser, updateUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const doCrypto = require('../utils/cryp')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo
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

/**
 * 登录
 * @param {Object} ctx
 * @param {string} userName
 * @param {string} password
 * @returns {Promise<ErrorModel|SuccessModel>}
 */
async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }
    // 登录成功，将用户信息放入session中，用于其他接口的是否登录验证
    if (!ctx.session.userInfo) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改个人信息, 同时同步session中的信息
 * @param {Object} ctx
 * @param {string} nickName
 * @param {string} city
 * @param {String} picture
 * @returns {Promise<void>}
 */
async function changeInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }
    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        {
            userName
        }
    )
    if (result) {
        // 成功需要同步session中的用户信息
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo
}