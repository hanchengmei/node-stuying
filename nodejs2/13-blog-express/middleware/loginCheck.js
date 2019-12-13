// 判断是否登录, 是中间件
const { ErrorModel } = require('../../04-blog1/src/model/resModel')

module.exports = (req, res, next) => {
    if (!req.session.userName) {
        res.json(
            new ErrorModel('未登录')
        )
        return
    }
    next()
}