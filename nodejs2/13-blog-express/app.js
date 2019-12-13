var createError = require('http-errors'); // 错误页的处理
var express = require('express');
var path = require('path');
const fs = require('fs')
var cookieParser = require('cookie-parser'); // 解析cookie
var logger = require('morgan'); // 记录日志
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

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



app.use(express.json()); // getPostData: post请求数据放到req.body， content-typ是json
app.use(express.urlencoded({ extended: false })); // content-type不是json格式的
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// session连接redis
const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
    client: redisClient
})
// session处理， 放入到req.session中
app.use(session({
    secret: 'WJiol#23123_',
    cookie: {
      // path: '/', // 默认配置
      // httpOnly: true, // 默认配置
      maxAge: 24 * 60 * 60 * 1000 // 24小时过期
    },
    store: sessionStore
}))

// app.use('/', indexRouter);
// app.use('/users', usersRouter); // 第一个参数是父路径，与usersRouter中的路径拼接
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
