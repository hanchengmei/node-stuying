/**
 * @description 用户关系 controller
 */
const { getUserByFollower } = require('../service/user-relation')

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

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

module.exports = {
    getFans
}














