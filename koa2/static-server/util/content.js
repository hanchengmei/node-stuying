//获取静态资源内容  文件内容或者目录名称的html

const path = require('path')
const fs = require('fs')

const dir = require('./dir') //返回目录内容  html
const file = require('./file') //返回文件内容

//ctx->上下文
//fullStaticPath -> 静态资源目录在本地的绝对路径
//返回 请求获取到的本地内容
async function content( ctx, fullStaticPath ) {
	//合并请求资源的完整绝对路径
	let reqPath = path.join( fullStaticPath, ctx.url )

	//请求路径是否为存在目录或文件
	let exist = fs.existsSync( reqPath )

	let content = ''

	if( !exist ) {
		content = '404 Not Found! o(╯□╰)o！'
	}else {

		let stat = fs.statSync( reqPath ) //访问路径是文件夹还是文件

		if( stat.isDirectory() ) {
			//若为目录，则读取目录内容
			content = dir( ctx.url, reqPath ) //dir()目录名称的html
		}else {
			//若是文件，则读取文件内容
			content = await file( reqPath)  //file()返回文件内容
		}
	}
	return content
}

module.exports = content