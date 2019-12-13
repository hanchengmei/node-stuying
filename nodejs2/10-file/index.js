const fs = require('fs')
const path = require('path')

// 获取data.txt文件路径
const fileName = path.resolve(__dirname, 'data.txt')
console.log('文件路径：', fileName)

// 读取文件内容
fs.readFile(fileName, (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('文件内容：', data.toString())
})

// 写文件内容
const content = '这是新添加的内容2'
const options = {
    flag: 'a' // a:追加内容 w:覆盖
}

fs.writeFile(fileName, content, options, err => {
    console.log('添加成功')
})

// 判断文件是否存在
fs.exists(fileName, exists => {
    console.log(exists)
})