// 连接sequelize
const Sequelize = require('sequelize')

const conf = {
    host: 'localhost',
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

// 连接池
conf.pool = {
    max: 5, // 最多连接5个
    min: 0,
    idle: 10000 // 一个连接池10s被使用，则被释放
}


// 参数(库名，用户，密码，options)
const seq = new Sequelize('test', 'root', 'admin', conf)

module.exports = seq