/**
 * @description profile api
 */

const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blogs')
const { follow, unFollow } = require('../../controller/user-relation')

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

// 关注
router.post('/follow', async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo // 登录者id
    const { userId: curUserId } = ctx.request.body // 浏览的别人的id
    ctx.body = await follow(myUserId, curUserId)
})

// 取消关注
router.post('/unFollow', async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    ctx.body = await unFollow(myUserId, curUserId)
})

module.exports = router