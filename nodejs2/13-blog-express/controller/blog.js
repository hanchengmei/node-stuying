const xss = require('xss')
const { exec } = require('../db/mysql')

// 获取列表，参数：作者，关键字
const getList  = (author, keyword) => {
    let sql = 'select * from blogs where 1=1 '
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createTime desc;`
    // 返回的是promise
    return exec(sql)
}

// 获取详情，参数id
const getDetail = id => {
    // 返回对象
    // return {
    //     id: 1,
    //     name: 'lily',
    //     createTime: '2019-11-1',
    //     title: '名称1',
    //     content: '内容'
    // }
    let sql = `select * from blogs where id=${id}`
    // 查询到的是数组，需要返回对象
    return exec(sql).then(data => {
        return data[0] || {}
    })
}

// 创建
const newBlog = (blogData = {}) => {
    // 返回创建的id
    // return {
    //     id : 3 // 表示添加成功
    // }
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createTime = Date.now()
    const sql = `
        insert into blogs (title, content, createTime, author)
        values ('${title}', '${content}', ${createTime}, '${author}')
    `
    return exec(sql).then(res => {
        return res.insertId
    })
}

// 更新
const updateBlog = (id, blogData = {}) => {
    // return true
    const sql = `
        update blogs set title='${blogData.title}', content='${blogData.content}' where id=${id}
    `
    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true
        }
        return false
    })
}

// 删除
const delBlog = (id, author) => {
    // return true
    const sql = `
        delete from blogs where id=${id} and author='${author}'
    `
    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}