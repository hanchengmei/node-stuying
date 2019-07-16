// 用管道和链式压缩文件
let fs = require('fs');
let zlib = require('zlib');

// 压缩input.txt文件为input.txt.gz
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'));

console.log('文件压缩完成');
