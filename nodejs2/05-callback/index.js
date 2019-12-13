// 读取file中的文件，并根据next读取下一个文件
const fs = require('fs')
const path = require('path')

function getFileContent(fileName, callback) {
    const fullFileName = path.resolve(__dirname, 'file', fileName)
    fs.readFile(fullFileName, (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        callback(
            JSON.parse(data.toString())
        )
    })
}

getFileContent('a.json', aData => {
    console.log('aData:', aData)
    getFileContent(aData.next, bData => {
        console.log('bData:', bData)
        getFileContent(bData.next, cData => {
            console.log(cData)
        })
    })
})