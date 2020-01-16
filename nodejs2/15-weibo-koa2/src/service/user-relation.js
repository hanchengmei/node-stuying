/**
 * @description 用户关系 service
 */
const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户粉丝列表
 * @param {number} followerId 被关注人
 * @returns {Promise<void>}
 */
async function getUserByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId
                }
            }
        ]
    })

    // 格式化用户
    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)
    console.log('数据库获取数据：', userList)

    return {
        count: result.count,
        userList
    }
}

/**
 * 添加关注关系 userId关注followerId
 * @param {number} userId 用户
 * @param {number} followerId 被关注者
 * @returns {Promise<void>}
 */
async function addFollower(userId, followerId) {
    const result = await UserRelation.create({
        userId,
        followerId
    })
    return result.dataValues
}

async function deleteFollower(userId, followerId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return result > 0
}


module.exports = {
    getUserByFollower,
    addFollower,
    deleteFollower
}