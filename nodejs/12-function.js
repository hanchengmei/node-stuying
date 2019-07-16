// 一个函数作为另一个函数的参数传递
let http = require('http');

function onRequest(request, response) {
    response.writeHeader(200, {'Content-Type': 'text/plain'});
    response.write('hello world');
    response.end();
};

http.createServer(onRequest).listen(8888);
