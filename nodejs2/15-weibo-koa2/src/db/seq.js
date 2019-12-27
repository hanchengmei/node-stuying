// 连接sequelize
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isTest, isProd } = require('../utils/env')

console.log('MYSQL_CONF', MYSQL_CONF)

const { host, user, password, dataBase } = MYSQL_CONF

const conf = {
    host,
    dialect: 'mysql', // 数据库类型
    dialectOptions: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    define: {
        underscored: 'utf8',
        charset: 'utf8'
    }
}

// 单元测试时，sequelize不打印sql语句
if(isTest) {
    conf.logging = () => {}
}

// 正式：连接池
if (isProd) {
    conf.pool = {
        max: 5, // 最多连接5个
        min: 0,
        idle: 10000 // 一个连接池10s被使用，则被释放
    }
}

// 参数(库名，用户，密码，options)
const seq = new Sequelize(dataBase, user, password, conf)

module.exports = seq