/**
 * @description 公共接口 api路由
 */
const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { loginCheck } = require('../../middlewares/loginChecks')
const { saveFile } = require('../../controller/util')

router.prefix('/api/util')

// 上传图片 需要登录验证，上传图片验证
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
    // 获取上传的路径
    console.log('图片路径', ctx.req.files['file'])
    const file = ctx.req.files['file']
    if(!file) {
        return
    }
    const { size, path, name, type } = file
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    })
})

module.exports = router