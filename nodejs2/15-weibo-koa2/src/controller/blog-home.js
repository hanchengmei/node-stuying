/**
 * @description 首页blog controller
 */
const { createBlog } = require('../service/blog')
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

module.exports = {
    create
}
