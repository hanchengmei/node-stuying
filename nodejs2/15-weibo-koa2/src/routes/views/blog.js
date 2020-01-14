/**
 * @description 微博相关页面路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {
        title: '这是首页'
    })
})

module.exports = router