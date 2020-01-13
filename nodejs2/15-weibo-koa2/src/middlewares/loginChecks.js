/**
 * @description 验证是否登录的中间件
 */
const ErrorModel = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * 接口 登录验证，登录后才能请求接口
 * @param {Object} ctx
 * @param {function} next
 * @returns {Promise<void>}
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }
    // 未登录
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面 登录验证，若登录过，可以访问，未登录，则跳转到登录页，登录后并跳转到之前浏览的页面
 * @param {Object} ctx
 * @param {string} next
 * @returns {Promise<void>}
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }
    // 未登录
    const curUrl = ctx.url
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
    loginCheck,
    loginRedirect
}