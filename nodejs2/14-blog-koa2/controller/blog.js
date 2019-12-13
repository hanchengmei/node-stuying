const xss = require('xss')
const { exec } = require('../db/mysql')

// 获取列表，参数：作者，关键字
const getList  = async (author, keyword) => {
    let sql = 'select * from blogs where 1=1 '
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createTime desc;`
    // 返回的是promise
    return await exec(sql)
}

// 获取详情，参数id
const getDetail = async (id) => {
    // 返回对象
    let sql = `select * from blogs where id=${id}`
    // 查询到的是数组，需要返回对象
    // promise 方法
    // return exec(sql).then(data => {
    //     return data[0] || {}
    // })
    // 同步方法
    const data = await exec(sql)
    return data[0] || {}
}

// 创建
const newBlog = async (blogData = {}) => {
    // 返回创建的id
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createTime = Date.now()
    const sql = `
        insert into blogs (title, content, createTime, author)
        values ('${title}', '${content}', ${createTime}, '${author}')
    `
    // promise 方法
    // return exec(sql).then(res => {
    //     return res.insertId
    // })
    // 同步方法
    const res = await exec(sql)
    return res.insertId
}

// 更新
const updateBlog = async (id, blogData = {}) => {
    // return true
    const sql = `
        update blogs set title='${blogData.title}', content='${blogData.content}' where id=${id}
    `
    // promise 方法
    // return exec(sql).then(res => {
    //     if (res.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })
    // 同步方法
    const res = await exec(sql)
    if (res.affectedRows > 0) {
        return true
    }
    return false
}

// 删除
const delBlog = async (id, author) => {
    // return true
    const sql = `
        delete from blogs where id=${id} and author='${author}'
    `
    const res = await exec(sql)
    if (res.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}