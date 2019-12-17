const { Blog } = require('./model')

!async function() {
    const updateBlog = await Blog.update({
        title: '这是修改过的title'
    }, {
        where: {
            id: 1
        }
    })
    console.log('是否修改成功：', updateBlog)
}()