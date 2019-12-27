const router = require('koa-router')()

// error
router.get('/error', async (ctx, next) => {
   await ctx.render('出错了')
})

// 404
router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router