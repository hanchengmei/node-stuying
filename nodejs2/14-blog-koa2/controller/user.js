const { exec, escape } = require('../db/mysql')

// 登录
const login = (userName, password) => {
    // 预防sql注入
    userName = escape(userName)
    password = escape(password)
    const sql = `
        select * from users where userName=${userName} and password=${password}
    `
    return exec(sql).then(res => {
        return res[0] || {}
    })
}

module.exports = {
    login
}