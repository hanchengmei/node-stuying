/**
 * @description user api路由，调用业务逻辑层
 * 此层可以校验登录，用户信息等
 */
const router = require('koa-router')()
const { isExist, register, login, deleteCurUser } = require('../../controller/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const userValidator = require('../../validator/user')

// 给路由加前缀
router.prefix('/api/user')

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// 注册
/**
 * 相当于
 * router.post('/register', async (ctx, next) => {
 *  const data = ctx.request.body
        const error = userValidator(data)
        if (error){
            // 验证未通过
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        // 验证通过
        await next()
 * }, async (ctx, next) => {...}
 */
router.post('/register', genValidator(userValidator), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', async (ctx, next) => {
    if (isTest) {
        // 测试环境下，测试账号登录后，删除自己
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

module.exports = router