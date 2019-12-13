const express = require('express')
const router = express.Router()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    // 连接数据库
    const result = login(username, password)
    return result.then(data => {
        if (data.userName) {
            // 设置session
            req.session.userName = data.userName
            req.session.realName = data.realName

            // express-session直接同步到redis中，不需手动同步

            // 登录成功
            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('登录失败')
        )
    })
})

// 测试登录
// router.get('/login-test', (req, res, next) => {
//     if (!req.session.userName) {
//         res.json({
//             errno: 0,
//             msg: '未登录'
//         })
//         return
//     }
//     res.json({
//         errno: 0,
//         msg: '已登录'
//     })
// })

// 测试session
// router.get('/get-session', (req, res, next) => {
//     const session = req.session
//     if (!session.viewnum) {
//         session.viewnum = 0
//     }
//     session.viewnum ++
//     res.json({
//         data: session.viewnum,
//         errno: 0
//     })
// })

module.exports = router