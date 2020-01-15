/**
 * @description 个人主页profile 业务逻辑层
 */
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getBlogListByUser } = require('../service/blog')

/**
 * 获取blog列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页数
 * @returns {Promise<void>}
 */
async function getProfileBlogList(userName, pageIndex = 0) {
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
    })

    const blogList = result.blogList

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })

}

module.exports = {
    getProfileBlogList
}