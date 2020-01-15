/**
 * @description 微博相关页面路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { isExist } = require('../../controller/user')
const { getProfileBlogList } = require('../../controller/blog-profile')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {
        title: '这是首页'
    })
})

// 个人主页 直接输入/profile, 查看自己的，跳转到/profile/自己的username
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // 已登录用户的信息
    const { userName: myUserName} = ctx.session.userInfo

    // 页面右侧个人信息
    let curUserInfo
    const { userName: curUserName } = ctx.params // 获取url后的参数userName
    const isMe = myUserName === curUserName  // 是否是已登录用户本人
    if (isMe) {
        curUserInfo = ctx.session.userInfo
    } else {
        // 不是登录者本人，需要查看是否存在此用户
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return
        }
        // 用户名存在
        curUserInfo = existResult.data
    }

    // 页面左侧blog列表
    // 获取第一页数据
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe
        }
    })
})


module.exports = router