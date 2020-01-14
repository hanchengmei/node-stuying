/**
 * @description user view 页面打开路由
 * 
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

/**
 * 获取登录信息
 * @param {Object} ctx ctx
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin: false // 默认未登录
    }

    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }

    return data
}

// 登录页 第一个参数是页面路径
router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

// 注册页
router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

// 设置页，需要验证是否登录
router.get('/setting', loginRedirect, async (ctx, next) => {
    // 用户信息都在session中
    await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router
