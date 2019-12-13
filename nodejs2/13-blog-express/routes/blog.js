const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const express = require('express')
const router = express.Router()
const loginCheck = require('../middleware/loginCheck')

// 列表
router.get('/list', (req, res, next) => {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // 连接数据库
    // admin.html是用户自己的列表，需要登录后才能查看
    // 用户在访问admin.html页面时会请求'/api/blog/list?isadmin=1'
    if (req.query.isadmin) {
        if (!req.session.userName) {
            // 未登录
            res.json(
                new ErrorModel('未登录')
            )
            return
        }
        // 查询登录用户的列表
        author = req.session.userName
    }
    // getList返回的是promise
    const result = getList(author, keyword)
    return result.then(listData => {
        // 返回json格式数据
        res.json(
            new SuccessModel(listData)
        )
    })
})

// 详情
router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

// 创建， 用中间件判断是否登录
router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.userName
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

// 编辑
router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('更新失败')
        )
    })
})

// 删除
router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.userName
    const result = delBlog(req.query.id, author)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('删除失败')
        )
    })
})

module.exports = router