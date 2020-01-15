/**
 * @description blog相关的工具方法
 */
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取 widgets/blog-list.ejs的文件内容
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * 将blog列表渲染到页面中，得到html字符串
 * @param {Array} blogList blog列表
 * @param {boolean} canReply 是否回复
 */
function getBlogListStr(blogList, canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListStr
}