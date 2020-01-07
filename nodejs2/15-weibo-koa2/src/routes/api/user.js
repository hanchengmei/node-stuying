/**
 * @description user api路由，调用业务逻辑层
 * 此层可以校验登录，用户信息等
 */
const router = require('koa-router')

// 给路由加前缀
router.prefix('/api/user')

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {

})

// 注册
router.pos('/register', async (ctx, next) => {

})

module.exports = router