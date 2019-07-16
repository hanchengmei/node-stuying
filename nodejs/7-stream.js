// 写入流
let fs = require('fs');
let data = '这是写入流里新添加的文字';

// 创建一个可以写入的流，用createWriteStream，写入到文件input.txt中
let writerStream = fs.createWriteStream('input.txt');

// 使用utf8写入数据
writerStream.write(data, 'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件
writerStream.on('finish', function () {
    console.log('写入完成');
});

writerStream.on('error', function (err) {
    console.log(err.stack);
});

console.log('程序执行完毕');
