/**
 * @description blog数据模型
 * @type {Sequelize}
 */
const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('../types')

// blogs表
const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    image: {
      type: STRING
    },
    content: {
        type: TEXT,
        allowNull: false
    }
})

module.exports = Blog