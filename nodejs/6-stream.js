// 从流中读取数据
let fs = require('fs');
let data = '';

// 创建可读流 用createReadStream
let readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8
readerStream.setEncoding('UTF8');

// 处理流事件
readerStream.on('data', function (chunk) {
    data += chunk;
});

readerStream.on('end', function () {
    console.log(data);
});

readerStream.on('error', function (err) {
    console.log(err.stack);
});

console.log('程序执行完毕');
