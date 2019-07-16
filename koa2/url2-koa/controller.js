const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            //如果url类似"GET XXX"
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            //如果url类似"POST XXX"
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            //无效的url
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    //var files = fs.readdirSync(__dirname + '/controllers');
    var files = fs.readdirSync(__dirname + '/' + dir);
    var js_files = files.filter((f) => { //过滤出.js文件
        return f.endsWith('.js');
    });

    //处理每个js文件
    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        //导入js文件
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
    //以上可以连起来
    // fs.readdirSync(__dirname + '/' + dir).filter((f) => {
    //     return f.endsWith('.js');
    // }).forEach((f) => {
    //     console.log(`process controller: ${f}...`);
    //     let mapping = require(__dirname + '/' + dir + '/' + f);
    //     addMapping(router, mapping);
    // });
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', //如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};