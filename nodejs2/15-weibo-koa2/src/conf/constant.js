/**
 * @description 常量集合
 * @type {{PAGE_SIZE: number}}
 */

module.exports = {
    PAGE_SIZE: 10,
    // 正则表达式，匹配 '@昵称 - userName'
    REG_FOR_AT_WHO: /@(.+?)\s-\s(\w+?)\b/g
}