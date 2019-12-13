const http = require('http')
const querystring = require('querystring')

http.createServer((req, res) => {
    req.query = querystring.parse(req.url.split('?')[1])
    res.end(JSON.stringify(req.query))
}).listen(8000)
console.log('ok')
