/**
 * @description 格式化数据
 */
const { REG_FOR_AT_WHO } = require('../conf/constant')
const { timeFormat } = require('../utils/dt')

/**
 * 格式化用户头像
 * @param(object) obj 用户
 * @private
 */
function _formatUserPicture(obj) {
    if (obj.picture === null) {
        obj.picture = 'http://test.yaobaoer.cn/ypr_oss/test/2019/11/22/1574410840477-z-defaultHead.png'
    }
    return obj
}

/**
 * 格式化单个或多个用户
 * @param(Object | Array) list 单个或多个用户
 */
function formatUser(list) {
    if (list === null) {
        return list
    }
    if (list instanceof Array) {
        // 多个用户
        return list.map(_formatUserPicture)
    }
    // 单个
    return _formatUserPicture(list)
}

/**
 * 格式化单个blog数据的时间
 * @param {Object} obj blog对象
 * @private
 */
function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}

/**
 * 格式化blog内容 给at的人加链接
 * @param {object} obj blog
 * @private
 */
function _formatContent(obj) {
    obj.contentFormat = obj.content
    debugger
    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            console.log('匹配第一个参数：', matchStr)
            console.log('匹配第二个参数：', nickName)
            console.log('匹配第三个参数：', userName)
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )
    return obj
}

/**
 * 格式化blog
 * @param (Object | Array) list 单个或多个blog
 */
function formatBlog(list) {
    if (list === null) {
        return list
    }
    if (list instanceof Array) {
        // 多个blog
        return list.map(_formatDBTime).map(_formatContent)
    }

    // 单个blog
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
}

module.exports = {
    formatUser,
    formatBlog,
}