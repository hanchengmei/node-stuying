// 逐行读取日志access.js， 并分析有多少是chrome浏览器
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')

// 创建readstream对象
const readStream = fs.createReadStream(fileName)

// 创建readline对象
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0
let sum = 0

// 监听读取每行
rl.on('line', lineData => {
    if (!lineData) {
        return
    }
    // 记录总行
    sum ++

    const arr = lineData.split('--')
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        // 含有chrome
        chromeNum ++
    }
})

// 监听读取完成
rl.on('close', () => {
    console.log('chrome占比：' + chromeNum / sum)
})
