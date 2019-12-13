const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const fs = require('fs')
const path = require('path')
const morgan = require('koa-morgan')
const session = require('koa-generic-session')
const RedisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')

// 引入路由
const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 写日志, 有多种模式， dev:简单的，combined：比较详细
const ENV = process.env.NODE_ENV
const fileName = path.join(__dirname, 'logs', 'access.js')
const writeStream = fs.createWriteStream(fileName, {
    flags: 'a'
})
if (ENV !== 'production') {
    app.use(logger('dev'))
} else {
    // 正式，写入到文件中
    app.use(logger('combined', {
        stream: writeStream
    }))
}

// session
app.keys = ['WJiol#23123_']
app.use(session({
  // 配置cookie
  cookie: {
    path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
  },
  // 配置redis
  store: RedisStore({
      // all: '127.0.0.1:6379' // 本地redis地址
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
