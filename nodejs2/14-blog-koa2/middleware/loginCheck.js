// 判断是否登录, 是中间件
const { ErrorModel } = require('../model/resModel')

module.exports = async (ctx, next) => {
    if (!ctx.session.userName) {
        ctx.body = new ErrorModel('未登录')
        return
    }
    await next()
}