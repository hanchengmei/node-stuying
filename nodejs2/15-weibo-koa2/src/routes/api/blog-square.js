/**
 * @description 广场 api 路由
 */
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blogs')
const { getSquareBlogList } = require('../../controller/blog-square')

router.prefix('/api/square')
console.log('加载更多路由')

// 广场加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex }= ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getSquareBlogList(pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router