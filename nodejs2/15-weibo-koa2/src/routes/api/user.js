/**
 * @description user api路由，调用业务逻辑层
 * 此层可以校验登录，用户信息等
 */
const router = require('koa-router')()
const { isExist } = require('../../controller/user')

// 给路由加前缀
router.prefix('/api/user')

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// 注册
router.post('/register', async (ctx, next) => {

})

module.exports = router