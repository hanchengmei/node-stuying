const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../conf/contants')
const util = require('util') // node自带方法
const verify = util.promisify(jwt.verify) // 将jwt.verify方法转成promise

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', async (ctx, next) => {
  // 获取header中token
  const token = ctx.header.authorization
    try {
      const playload = await verify(token.split(' ')[1], SECRET)
      ctx.body = playload
    } catch (e) {
        ctx.body = {
          error: -1,
          msg: 'token解析失败'
        }
    }

})

router.post('/login', async (ctx, next) => {
  let userInfo
  const { userName, password } = ctx.request.body
  if(userName === 'zhangsan' && password === 'abc') {
    userInfo = {
      userName: 'zhangsan',
      password: 'abc',
      gender: 1
    }

    // 设置token
    const token = jwt.sign(userInfo, SECRET, {expiresIn: '1h'})
    ctx.body = token
  }
  if (!userInfo) {
    // 登录失败
    ctx.body = {
      error: -1,
      msg: '登录失败'
    }
    return
  }
})

module.exports = router
