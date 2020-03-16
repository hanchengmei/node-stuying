/**
 * @description 数据模型入口文件
 */
const Sequelize = require('sequelize')
const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

// 外键 查询blog带出user
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

// 根据UserRelation查：UserRelation的userid和User的id是一对一的关系
// 外键添加到 UserRelation 表中
UserRelation.belongsTo(User, {
    foreignKey: 'userId'
})

// 根据user查，user的userid和userRelation是一对多的关系  一个userid有多条userRelation
// 外键添加到 UserRelation 表中
User.hasMany(UserRelation, {
    foreignKey: 'followerId'
})

Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId'
})

module.exports = {
    User,
    Blog,
    UserRelation
}