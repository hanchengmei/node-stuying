/**
 * @description 首页blog controller
 */
const { PAGE_SIZE } = require('../conf/constant')
const { createBlog, getFollowersBlogList } = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    createBlogFailInfo
} = require('../model/ErrorInfo')

/**
 * 创建blog
 * @param {object} param0 创建blog所需数据 { userId, content, image }
 */
async function create({ userId, content, image }) {
    try {
       const blog = await createBlog({
           userId,
           content,
           image
       })
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex)
        return new ErrorModel(createBlogFailInfo)
    }
}

/**
 * 获取首页微博列表 当前用户的
 * @param {number} userId
 * @param {number} pageIndex
 * @returns {Promise<void>}
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList({
        userId,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const { count, blogList } = result

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageIndex,
        pageSize: PAGE_SIZE,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}
