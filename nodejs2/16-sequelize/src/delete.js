const { Blog } = require('./model')

!async function() {
    const deleteBlog = await Blog.destroy({
        where: {
            id: 2
        }
    })
    console.log('删除结果：', deleteBlog)
}()