/**
 * @description 首页blog api路由
 * 此层可以校验登录，表单数据格式验证
 */
const router = require('koa-router')()
const xss = require('xss')
const blogValidator = require('../../validator/blog')
const { loginCheck } = require('../../middlewares/loginChecks')
const { genValidator } = require('../../middlewares/validator')
const { create } = require('../../controller/blog-home')


router.prefix('/api/blog')

// 创建blog
router.post('/create', loginCheck, genValidator(blogValidator), async (ctx, next) => {
    const { content, image } = ctx.request.body
   // 登录时存入session中的userInfo有id
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({
        userId,
        content: xss(content),
        image
    })
})

module.exports = router