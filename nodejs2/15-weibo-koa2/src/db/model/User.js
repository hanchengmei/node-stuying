/**
 * @description 数据模型
 * @type {Sequelize}
 */
const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

// users表
const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名唯一'
    },
    password: {
        type: STRING,
        allowNull: false
    },
    nickName: {
        type: STRING,
        allowNull: false
    },
    gender: {
        type: DECIMAL,
        defaultValue: 3,
        comment: '1男 2女 3保密'
    },
    picture: {
        type: STRING
    },
    city: {
        type: STRING
    }
})

module.exports = User