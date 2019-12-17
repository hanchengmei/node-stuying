const { Blog, User } = require('./model')

!async function() {
    // 创建用户
    const zhangsan = await User.create({
        userName: 'zhangsan',
        password: '123',
        nickName: '张三'
    })
    console.log('zhangsan:', zhangsan.dataValues)
    const zhangsanId = zhangsan.dataValues.id

    const lisi = await User.create({
        userName: 'lisi',
        password: '123',
        nickName: '李四'
    })
    const lisiId = lisi.dataValues.id

    // 创建blog
    const blog1 = await Blog.create({
        title: '标题1',
        content: '内容1',
        userid: lisiId
    })

    const blog2 = await Blog.create({
        title: '标题2',
        content: '内容2',
        userid: zhangsanId
    })

    const blog3= await Blog.create({
        title: '标题3',
        content: '内容3',
        userid: zhangsanId
    })

    const blog4= await Blog.create({
        title: '标题4',
        content: '内容4',
        userid: lisiId
    })
}()