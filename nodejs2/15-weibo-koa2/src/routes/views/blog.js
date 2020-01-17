/**
 * @description 微博相关页面路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { isExist } = require('../../controller/user')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, getFollowers } = require('../../controller/user-relation')
const { getHomeBlogList } =require('../../controller/blog-home')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    // 获取第一页数据
    const result = await getHomeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取右侧粉丝列表
    const fansResult = await getFans(userId)
    const { count: fansCount, fansList } = fansResult.data

    // 获取右侧关注人列表
    const followersResult = await getFollowers(userId)
    const { count: followersCount, followersList } = followersResult.data

    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            }
        },
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
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

    // 获取右侧粉丝列表
    const fansResult = await getFans(curUserInfo.id)
    const { count: fansCount, fansList } = fansResult.data

    // 获取右侧关注人列表
    const followersResult = await getFollowers(curUserInfo.id)
    const { count: followersCount, followersList } = followersResult.data

    // 判断我是否是此人(url后的参数)的粉丝
    const amIFollowed = fansList.some(item => {
        return item.userName === myUserName
    })

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
            isMe,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
              count: followersCount,
              list: followersList
            },
            amIFollowed
        }
    })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取blog列表第一页， 同profile是从controller层获取，返回
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    console.log('页面路由中数据：', result.data)

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports = router