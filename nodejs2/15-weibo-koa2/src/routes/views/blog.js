/**
 * @description 微博相关页面路由
 */

const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: '这是首页'
    })
})

module.exports = router