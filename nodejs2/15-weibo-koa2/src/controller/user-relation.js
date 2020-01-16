/**
 * @description 用户关系 controller
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')
const { getUserByFollower, addFollower, deleteFollower } = require('../service/user-relation')

/**
 * 根据用户id获取粉丝列表
 * @param {number} userId 用户id
 * @returns {Promise<void>}
 */
async function getFans(userId) {
    const { count, userList } = await getUserByFollower(userId)

    return new SuccessModel({
        count,
        fansList: userList
    })
}

/**
 * 当前登录用户关注其他人
 * @param {number} myUserId 登录用户id
 * @param {number} curUserId 其他人id
 * @returns {Promise<void>}
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch (ex) {
        console.error(ex)
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 当前登录用户取消关注其他人
 * @param {number} myUserId 登录用户id
 * @param {number} curUserId 其他人id
 * @returns {Promise<void>}
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
    getFans,
    follow,
    unFollow
}














