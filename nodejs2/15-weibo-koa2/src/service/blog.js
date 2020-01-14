/**
 * @description blog service层
 */
const { Blog } = require('../db/model/index')

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

module.exports = {
    createBlog
}
