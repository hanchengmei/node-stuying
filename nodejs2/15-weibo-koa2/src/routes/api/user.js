/**
 * @description user api路由，调用业务逻辑层
 * 此层可以校验登录，用户信息等
 */
const router = require('koa-router')()
const userValidator = require('../../validator/user')
const { isTest } = require('../../utils/env')
const { isExist, register, login, deleteCurUser, changeInfo, changePassword, logout } = require('../../controller/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')

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

// 用户信息设置 需要登录验证和数据格式验证
router.patch('/changeInfo', loginCheck, genValidator(userValidator), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, {
        nickName, city, picture
    })

})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidator), async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    ctx.body = await changePassword(userName, password, newPassword)
})

// 退出
router.post('/logout', async (ctx, next) => {
    ctx.body = await logout(ctx)
})

module.exports = router