const { isProd } = require('../utils/env')

let REDIS_CONF
let MYSQL_CONF

// redis
REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

// sequelize
MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  dataBase: 'weibo' // 数据库名称
}

if (isProd) {
    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }

    // sequelize
    MYSQL_CONF = {
        user: 'root',
        password: 'admin',
        dataBase: 'weibo' // 数据库名称
    }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
