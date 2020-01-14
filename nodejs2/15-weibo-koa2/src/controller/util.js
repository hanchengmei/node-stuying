/**
 * @description 公共接口 业务逻辑
 */

const fse = require('fs-extra')
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')

console.log('根目录', __dirname)

//存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024 *1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})
/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} filePath 文件路径
 * @returns {Promise<void>}
 */
async function saveFile({ name, type, size, filePath }) {
    if (size > MAX_SIZE) {
        // 图片大小超出，需要移除并提示
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    // 将存储的文件移动到文件夹中
    const fileName = Date.now() + '.' + name // 防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 存放的文件夹
    await fse.move(filePath, distFilePath)

    console.log('url:' + distFilePath)
    // 返回url
    return new SuccessModel({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}