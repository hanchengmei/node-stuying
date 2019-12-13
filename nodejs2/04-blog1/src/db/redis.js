const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
    console.error(err)
})

function set(key, val) {
    if (typeof val === "object") {
        // val为对象，转为字符串
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null ){
                // key值不存在
                resolve(null)
                return
            }
            try {
                // 值为对象字符串，转为对象
                resolve(
                    JSON.parse(val)
                )
            }catch (e) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}