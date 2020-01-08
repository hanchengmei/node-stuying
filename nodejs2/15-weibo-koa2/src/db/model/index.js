/**
 * @description 数据模型入口文件
 */
const Sequelize = require('sequelize')
const User = require('./User')
const Blog = require('./Blog')

module.exports = {
    User,
    Blog
}