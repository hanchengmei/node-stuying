const redis = require('redis')

// 创建客户端，参数：端口号，地址
const redisClient = redis.createClient(6379, '127.0.0.1')

// 测试
redisClient.on('error', (err) => {
    console.error(err)
})

redisClient.set('myname', 'lily', redis.print)

redisClient.get('myname', (err, val) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('val:', val)
    // 退出
    redisClient.quit()
})