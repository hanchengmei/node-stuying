// 复制文件
const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-back.txt')

// data.txt的数据流向data-back.txt
const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

// 管道
readStream.pipe(writeStream)

// 监听数据
readStream.on('data', chunk => {
    console.log('接收的数据：', chunk.toString())
})

// 监听结束
readStream.on('end', () => {
    console.log('完成拷贝')
})
