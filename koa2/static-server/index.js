//原生koa获取静态资源

const Koa = require('koa')
const path = require('path')
const content = require('./util/content')
const mimes = require('./util/mimes')

const app = new Koa()

const staticPath = './static'

//获取资源类型
function parseMime( url ) {
	let extName = path.extname( url ) //返回文件的后缀,如.html
	extName = extName ? extName.slice(1) : 'unknown' //去掉.
	return mimes[ extName ]   //返回mimes.js中相对应的类型
}

app.use( async ( ctx ) => {
	//静态资源目录在本地的绝对路径
	let fullStaticPath = path.join(__dirname, staticPath )

	//获取静态资源内容，有可能是文件内容，目录的html,404
	let _content = await content( ctx, fullStaticPath )

	//请求内容的类型
	let _mime = parseMime( ctx.url )

	//若有对应的文件类型，就配置上下文的类型
	if ( _mime ) {
		ctx.type = _mime
	}

	//输出静态资源内容
	if ( _mime && _mime.indexOf('image/') >=0 ) {
		//若为图片，用node原生res,输出二进制数据
		ctx.res.writeHead(200)
		ctx.res.write(_content, 'binary')
		ctx.res.end()
	}else {
		//其他则输出文本
		ctx.body = _content
	}
} )

app.listen(2000)