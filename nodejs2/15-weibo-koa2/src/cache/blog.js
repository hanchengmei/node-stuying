/**
 * @description blog缓存
 */
const { set, get } = require('./_redis')
const { getBlogListByUser } = require('../service/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square'

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex
 * @param {number} pageSize
 * @returns {Promise<void|any>}
 */
async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    // 获取缓存
    const cacheResult = await get(key)
    if (cacheResult) {
        // 有缓存
        return cacheResult
    }

    // 无缓存，从数据库获取，再存入缓存
    const result = await getBlogListByUser({pageIndex, pageSize})

    set(key, result, 60)

    return result
}

module.exports = {
    getSquareCacheList
}