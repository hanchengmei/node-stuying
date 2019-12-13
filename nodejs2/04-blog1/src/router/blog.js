const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 验证是否登录
const loginCheck = req => {
    if (!req.session.userName) {
        return Promise.resolve(new ErrorModel('登录失败'))
    }
}
const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id || ''

    // 获取列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // 假数据处理方法
        // const listData = getList(author, keyword)
        // // 将数据初始化成对象返回给客户端
        // return new SuccessModel(listData)

        // 连接数据库
        // admin.html是用户自己的列表，需要登录后才能查看
        // 用户在访问admin.html页面时会请求'/api/blog/list?isadmin=1'
        if (req.query.isadmin) {
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                return loginCheckResult
            }
            // 查询登录用户的列表
            author = req.session.userName
        }
        // getList返回的是promise
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // 假数据处理方法
        // const detailData = getDetail(id)
        // return new SuccessModel(detailData)

        // 连接数据库
        // getDetail返回的是promise
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 创建
    if (method === 'POST' && req.path === '/api/blog/new') {
        // req.body是app.js中初始化的

        // 验证是否登录
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 如果未登录，将登录失败返回
            return loginCheck(req)
        }

        // 假数据处理方法
        // const data = newBlog(req.body)
        // return new SuccessModel(data)

        // 连接数据库
        // getDetail返回的是promise
        req.body.author = req.session.userName
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 跟新
    if (method === 'POST' && req.path === '/api/blog/update') {
        // 验证是否登录
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 如果未登录，将登录失败返回
            return loginCheckResult
        }
        // updateBlog返回的是promise
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                // 更新成功
                return new SuccessModel()
            }
            // 更新失败
            return new ErrorModel('更新失败')
        })
    }

    // 删除
    if (method === 'POST' && req.path === '/api/blog/del') {
        // 验证是否登录
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 如果未登录，将登录失败返回
            return loginCheckResult
        }
        const author = req.session.userName
        const result = delBlog(id, author)
        return result.then(val => {
            if (val) {
                // 删除成功
                return new SuccessModel()
            }
            // 删除失败
            return new ErrorModel('删除失败')
        })
    }
}

module.exports = handleBlogRouter