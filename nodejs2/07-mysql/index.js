const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'myblog'
})

// 连接
con.connect()

// 查询
// const sql = 'select * from users'
// con.query(sql, (err, res) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(res)
// })

// 插入
const addsql = 'insert into users(userName, password, realName) values("misha", "misha123", "大猫")'
con.query(addsql, (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(res)
})


// 断开连接
con.end()