/**
 * @description profile api
 */

const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blogs')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)

    const result = await getProfileBlogList(userName, pageIndex)
    // 渲染为html字符串
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router