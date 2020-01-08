/**
 * @description 格式化数据
 */

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
function formatUserList(list) {
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

module.exports = {
    formatUserList
}