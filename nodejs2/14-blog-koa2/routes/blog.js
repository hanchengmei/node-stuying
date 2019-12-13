const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

// 列表
router.get('/list', async (ctx, next) => {
    // url后的参数在ctx.query中
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''
    // 连接数据库
    // admin.html是用户自己的列表，需要登录后才能查看
    // 用户在访问admin.html页面时会请求'/api/blog/list?isadmin=1'
    if (ctx.query.isadmin) {
        if (!ctx.session.userName) {
            // 未登录
            ctx.body = new ErrorModel('未登录')
            return
        }
        // 查询登录用户的列表
        author = ctx.session.userName
    }
    // getList返回的是promise
    // 同步方法
    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)

    // promise 方法
    // const result = getList(author, keyword)
    // return result.then(listData => {
    //     // 返回json格式数据
    //     res.json(
    //         new SuccessModel(listData)
    //     )
    // })
})

// 详情
router.get('/detail', async (ctx, next) => {
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
})

// 创建
router.post('/new', loginCheck, async (ctx, next) => {
    // post请求的数据在ctx.request.body中
    ctx.request.body.author = ctx.session.userName
    const data = newBlog(ctx.request.body)
    ctx.body = new SuccessModel(data)
})

// 更新
router.post('/update', loginCheck, async (ctx, next) => {
    const val = await updateBlog(ctx.query.id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel()
        return
    }
    ctx.body = new ErrorModel('更新失败')
})

// 删除
router.post('/del', loginCheck, async (ctx, next) => {
    const author = ctx.session.userName
    const val = await delBlog(ctx.query.id, author)
    if (val) {
        ctx.body = new SuccessModel()
        return
    }
    ctx.body = new ErrorModel('删除失败')
})

module.exports = router


