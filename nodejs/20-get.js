// 获取get请求内容
let http = require('http');
let url = require('url');
let util = require('util');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

    let parmas = url.parse(req.url, true).query;

    res.write('网站名：' + parmas.name);
    res.write("\n");
    res.write("网站 URL：" + parmas.url);
    res.write("\n");
    res.write("\n");
    res.end(util.inspect(url.parse(req.url, true)));

}).listen(3000);
