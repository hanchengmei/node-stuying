const http = require('http')
const fs = require('fs')
const path = require('path')

// 请求接口时将data.txt的内容作为res返回
const fileName = path.resolve(__dirname, 'data.txt')
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        let readStream = fs.createReadStream(fileName)
        readStream.pipe(res)
    }
})

server.listen(3000)
console.log('ok')