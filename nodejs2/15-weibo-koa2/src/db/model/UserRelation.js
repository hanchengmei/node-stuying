/**
 * @description 用户关注关系 模型
 */
const seq = require('../seq')
const { INTEGER } = require('../types')

// userId关注followerId
const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注人id'
    }
})

module.exports = UserRelation