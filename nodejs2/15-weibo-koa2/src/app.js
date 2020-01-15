 const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static')
const path = require('path')

const session = require('koa-generic-session')
const RedisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')


// router
const homeAPIRouter = require('./routes/api/blog-home')
const profileAPIRouter = require('./routes/api/blog-profile')
const userViewRouter = require('./routes/views/user')
const userAPIRouter = require('./routes/api/user')
const blogViewRouter = require('./routes/views/blog')
const utilAPIRouter = require('./routes/api/util')
const errorRouterView = require('./routes/views/error')

// error handler
let onErrorConf = {}
if (isProd) {
    // 正式环境接口报错时跳转到404接口
    onErrorConf = {
        redirect: '/404'
    }
}
onerror(app, onErrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
 // 静态目录。任何文件放入都可以访问
app.use(koaStatic(__dirname + '/public'))

 // 上传图片文件夹 同上
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session
app.keys = ['ddfd44_dd']
app.use(session({
    key: 'weibo.sid', // cookie name 默认是koa.sid
    prefix: 'weibo:sess', // redis key前缀 默认是koa:sess
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // cookie过期时间
    },
    store: RedisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// 注册routes
 app.use(homeAPIRouter.routes(), homeAPIRouter.allowedMethods())
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilAPIRouter.routes(), utilAPIRouter.allowedMethods())
// app.use(errorRouterView.routes(), errorRouterView.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
