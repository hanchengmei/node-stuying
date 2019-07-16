// 在12-function的基础上改进
let http = require('http');
let url = require('url');

function start() {
    // 请求的路径及参数在request中
    function onRequest(request, response) {
        let pathName = url.parse(request.url).pathname;
        console.log(pathName);
        response.writeHeader(200, {'Content-Type': 'text/plain'});
        response.write('hello world');
    };
    http.createServer(onRequest).listen(8888);

    console.log('server has started')
}

start();
