const http = require('http')

http.createServer((req, res) => {
    if(req.method === 'POST') {
        console.log('content-type:', req.headers['content-type'])
        let postData = ''
        // 监听接收数据流
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            res.end('hello world')
        })
    }
}).listen(8000)
console.log('ok')