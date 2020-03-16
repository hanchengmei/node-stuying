/**
 * @description 用户关系 service
 */
const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')

/**
 * 获取某人的粉丝列表
 * @param {number} followerId 被关注人
 * @returns {Promise<void>}
 */
async function getUserByFollower(followerId) {
    console.log('被关注人：', followerId)
    // 先查到user 中与 UserRelation中userid关联的行，再筛选 followerId
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId,
                    userId: {
                        [Sequelize.Op.ne]: followerId  // userId不等于followerId
                    }
                }
            }
        ]
    })

    // 格式化用户
    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)
    console.log('数据库获取粉丝数据：', userList)

    return {
        count: result.count,
        userList
    }
}

/**
 * 获取某人的关注列表
 * @param userId
 */
async function getFollowerByUser(userId) {
    // 在 UserRelation 中找到所有的userId行， UserRelation中的 followerId 和 user表中的id关联
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
               attributes: ['id', 'userName', 'nickName', 'picture']
            }
        ],
        where: {
            userId,
            followerId: {
                [Sequelize.Op.ne]: userId
            }
        }
    })

    let userList = result.rows.map(row => row.dataValues)

    userList = userList.map(item => {
        let user = item.user
        user = user.dataValues
        user = formatUser(user)
        return user
    })

    console.log('数据库获取关注人数据：', userList)

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

/**
 * 删除关注关系 userId取消关注followerId
 * @param userId
 * @param followerId
 * @returns {Promise<boolean>}
 */
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
    deleteFollower,
    getFollowerByUser
}