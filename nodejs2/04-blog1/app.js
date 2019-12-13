const querystring = require('querystring')
const { set, get } = require('./src/db/redis')
const { access } = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 存储session
// const SESSION_DATA = {}

// 设置cookie过期时间
// toGMTString（）把Date对象转为字符串
const toGetCookieExpire = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

// 处理post 请求data, 返回postData
const getPostData = req => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 记录访问日志user-agent: 访问的浏览器
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    // 获取url
    const url = req.url
    req.path = url.split('?')[0]

    // 解析get请求url后的参数，放入到req中
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' // 形式：key1=val1; key2=val2
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        let arr = item.split('=')
        const key = arr[0]
        const val = arr[1]
        req.cookie[key] = val
    })

    // 【全局变量方法存储】
    // 解析session, 根据cookie中的userid设置session
    // let needSetCookie = false // 标识是否需要设置cookie
    // let userId = req.cookie.userid
    // console.log('SESSION_DATA:', SESSION_DATA)
    // if (userId) {
    //     // cookie中有userid
    //     if (!SESSION_DATA[userId]) {
    //         // SESSION_DATA中无，初始化空值
    //         SESSION_DATA[userId] = {}
    //     }
    //     req.session = SESSION_DATA[userId]
    // } else {
    //     // cookie中无userid,赋值随机数
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    //     req.session = SESSION_DATA[userId]
    // }

    // 【redis 方法存储】从redis中根据sessionId获取到值，放入req.session中
    // 形式 sessionId: {username: '', age: ''}
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化redis中的session值
        set(userId, {})
    }
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData === null) {
            // redis中没有sessionId
            // 初始化redis中的session值
            set(req.sessionId, {})
            // 设置session
            req.session = {}
        } else {
            // 设置session
            req.session = sessionData
        }
        return getPostData(req)
    }).
    // 解析post请求的参数，放入到req中
    // 所有路由可以获取到req中的postData
    // 此处若是用getPostData（req）.then(...)会导致req.session没有值
    then(postData => {
        req.body = postData
        // 处理blog路由
        // 假数据处理方法
        // const blogData = handleBlogRouter(req, res)
        // if (blogData) {
        //     res.end(JSON.stringify(blogData))
        //     return
        // }

        // 连接数据库处理方法
        // handleBlogRouter返回的是promise
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    // cookie 中没有userid， 需要设置
                    res.setHeader('Set-cookie', `userid=${userId}; path=/; httpOnly; expires=${toGetCookieExpire()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // 处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    // cookie 中没有userid， 需要设置
                    res.setHeader('Set-cookie', `userid=${userId}; path=/; httpOnly; expires=${toGetCookieExpire()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }
        // 404
        res.writeHead(404, {'Content-type': 'text/plain'})
        res.write('404 not found')
        res.end()
    })
}

module.exports = serverHandle