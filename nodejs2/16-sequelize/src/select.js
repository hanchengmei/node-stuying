const { Blog, User } = require('./model')

!async function() {
    // 查询userName=zhangsan
    // const zhangsan = await User.findOne({
    //     where: {
    //         userName: 'zhangsan'
    //     }
    // })
    // console.log('查询数据：', zhangsan.dataValues)

    // 查询userName=zhangsan的userName,nickName
    // const zhangsan2 = await User.findOne({
    //     attributes: ['userName', 'nickName'],
    //     where: {
    //         userName: 'zhangsan'
    //     }
    // })
    // console.log('查询数据zhangsan2：', zhangsan2.dataValues)

    // 查询列表并排序
    // const zhansanBlogList = await Blog.findAll({
    //     where: {
    //         userid: 1
    //     },
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })
    // console.log(
    //     '张三的数据：',
    //     zhansanBlogList.map(item => item.dataValues)
    // )

    // 分页查询
    // const lisiBlogList = await Blog.findAll({
    //     limit: 1, // 每页显示数
    //     offset: 1, // 跳过的数
    //     where: {
    //         userid: 2
    //     },
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })
    // console.log(
    //     '李四的数据：',
    //     lisiBlogList.map(item => item.dataValues)
    // )

    // 总数
    // const allAndCount = await Blog.findAndCountAll({
    //         limit: 2, // 每页显示数
    //         offset: 1, // 跳过的数
    //         order: [
    //             ['id', 'desc']
    //         ]
    // })
    // console.log(
    //     '总数据：',
    //     allAndCount.count,
    //     allAndCount.rows.map(item => item.dataValues)
    // )

    // 连表查询
    // 通过blog查user,对应model中的blog.belongsTo(user)
    // 查询zhangsan的博客，包含userName, realName
    const blogWithUser = await Blog.findAndCountAll({
        include: [ // 可以包含多个
            {
                model: User,
                attributes: ['userName', 'nickName'],
                where: {
                    userName: 'zhangsan'
                }
            }
        ]
    })
    console.log(
        'zhangsan的博客和用户信息',
        blogWithUser.rows.map(item => {
            // item格式
            // {
            //     dataValues: {title: '', content:'', ...},
            //     user: {
            //         dataValues: {userName: '', nickName:'', ...}
            //     }
            // }
            let blog = item.dataValues
            blog.user = blog.user.dataValues
            return blog
        })
    )
    // 通过user差blog,对应model中的user.hasMany(blog)
    // 查询lisi的信息，包含他的博客
    const UserWithBlog = await User.findAndCountAll({
        attributes: ['userName', 'nickName'],
        include: [
            {
                model: Blog
            }
        ]
    })
    console.log(
        'lisi的信息和他的博客',
        UserWithBlog.rows.map(user => {
            // item格式
            // {
            //     dataValues: {userName: '', nickName:'', ...},
            //     blogs: [
            //         { dataValues:{blog1} },{ dataValues: {blog2} }
            //     ]
            // }
            let userVal = user.dataValues
            userVal.blogs = userVal.blogs.map(blog => blog.dataValues)
            return userVal
        })
    )
}()