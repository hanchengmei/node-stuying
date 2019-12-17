// 创建模型
const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建user表模型，表名会自动变为复数
// id会自动创建
// 自动创建createdAt和editedAt
// 参数：(表名，{列名:{....}})
const User = seq.define('user', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING,
        comment: '允许为空'
    }
})

// 创建blog模型
const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '这里是注释'
    },
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

// 创建外键
Blog.belongsTo(User, {
    foreignKey: 'userid'
})

User.hasMany(Blog, {
    foreignKey: 'userid'
})

module.exports = {
    User,
    Blog
}