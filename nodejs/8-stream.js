// 管道流，从一个流中获取数据并将数据传递到另外一个流中，实现复制
let fs = require('fs');

// 创建一个可读流
let readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
let writerSteam = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取input.txt文件的内容，并将内容写入到output.txt文件中
readerStream.pipe(writerSteam);

console.log('程序执行完成');
