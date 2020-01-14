/**
 * @description 数据模型入口文件
 */
const Sequelize = require('sequelize')
const User = require('./User')
const Blog = require('./Blog')

// 外键 查询blog带出user
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}