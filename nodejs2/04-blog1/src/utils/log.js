const fs = require('fs')
const path = require('path')

// const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')
// const writeStream = fs.createWriteStream(fileName,{
//     flags: 'a'
// })
// writeStream.write('内容')

// 封装
// 生成writestream
function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    accessWriteStream.write(log + '\n')
}

module.exports = {
    access
}