const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

// 登录
router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body
    // 连接数据库
    const data = await login(username, password)
    if (data.userName) {
        // 设置session
        ctx.session.userName = data.userName
        ctx.session.realName = data.realName

        // 登录成功
        ctx.body = new SuccessModel()
        return
    }
    ctx.body = new ErrorModel('登录失败')
})

// 测试session
// router.get('/get-session', async (ctx, next) => {
//     if (!ctx.session.viewNum) {
//         ctx.session.viewNum = 0
//     }
//     ctx.session.viewNum ++
//     ctx.body = {
//         errno: 0,
//         viewNum: ctx.session.viewNum
//     }
// })

module.exports = router