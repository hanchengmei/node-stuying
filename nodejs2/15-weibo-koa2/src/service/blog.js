/**
 * @description blog service层
 */
const { Blog, User, UserRelation } = require('../db/model/index')
const { formatBlog, formatUser } = require('./_format')

/**
 * 创建微博
 * @param {number} userId
 * @param {string} content
 * @param {string} image
 * @returns {Promise<void>}
 */
async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

/**
 * 根据用户获取blog列表
 * @param { Object } param0 查询参数 { userName, pageIndex = 0, pageSize = 10}
 * @returns {Promise<void>}
 */
async function getBlogListByUser(
    { userName, pageIndex = 0, pageSize = 10 }
) {
    const whereOpt = {}
    if (userName) {
        whereOpt.userName = userName
    }

    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: whereOpt
            }
        ]
    })
    // result.count 总数，跟分页无关
    // result.rows 查询结果，数组
    // result.rows[0]格式
    // {
    //     dataValues: {title: '', content:'', ...},
    //     user: {
    //         dataValues: {userName: '', nickName:'', ...}
    //     }
    // }

    // 获取blog列表
    let blogList = result.rows.map(row => row.dataValues)

    // 格式化
    blogList = formatBlog(blogList)
    console.log('profiel查询数据',blogList)
    blogList = blogList.map(item => {
        const user = formatUser(item.user.dataValues)
        item.user = user
        return item
    })

    return {
        count: result.count,
        blogList
    }
}

/**
 * 登录用户为a, a关注了b
 * 获取b的blog列表（首页）
 * @param userId
 * @param pageIndex
 * @param pageSize
 * @returns {Promise<{count: *, blogList: *}>}
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10}) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followerId'],
                where: {
                    userId
                }
            }
        ]
    })

    let blogList = result.rows.map(row => row.dataValues)

    blogList = formatBlog(blogList)
    console.log('首页查询数据',blogList)
    blogList = blogList.map(item => {
        item.user = formatUser(item.user.dataValues)
        return item
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowersBlogList
}
