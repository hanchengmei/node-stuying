const fs = require('fs')
const path = require('path')

function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'file', fileName)
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

getFileContent('a.json').then(aData => {
    console.log('aData:', aData)
    return getFileContent(aData.next)
}).then(bData => {
    console.log('bData:', bData)
    return getFileContent(bData.next)
}).then(cData => {
    console.log('cData:', cData)
})