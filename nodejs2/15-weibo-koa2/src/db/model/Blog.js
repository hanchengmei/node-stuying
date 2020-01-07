/**
 * @description blog数据模型
 * @type {Sequelize}
 */
const seq = require('../seq')
const { STRING, TEXT, DECIMAL } = require('../types')

// blogs表
const Blog = seq.define('blog', {
    title: {
        type: STRING,
        allowNull: false,
        comment: '名称'
    },
    content: {
        type: TEXT,
        allowNull: false
    }
})

module.export = {
    Blog
}