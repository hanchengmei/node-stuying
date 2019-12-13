const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

// 设置cookie过期时间
// toGMTString（）把Date对象转为字符串
const toGetCookieExpire = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}
const handleUserRouter = (req, res) => {
    const method = req.method

    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        // 连接数据库
        const result = login(username, password)
        return result.then(data => {
            if (data.userName) {
                // 设置session
                req.session.userName = data.userName
                req.session.realName = data.realName
                // 同步到redis
                set(req.sessionId, req.session)
                // 登录成功
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

    // 登录cookie验证 如果cookie中有userName，登录成功
    // if (method === 'GET' && req.path === '/api/user/login_test') {
    //     if (req.session.userName) {
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session
    //         }))
    //     }
    //     return Promise.resolve(new ErrorModel('登录失败'))
    //
    // }
}

module.exports = handleUserRouter