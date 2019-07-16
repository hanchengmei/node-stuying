const Koa = require("koa")
const fs = require("fs")
const app = new Koa()

//异步读取html内容
function render( page ) {
	return new Promise( ( resolve, reject ) => {
		let viewUrl = `./view/${ page }`
		//readFile是fn模块的方法->读取文件内容
		//readFile(文件路径, 编码格式[可选], callback(err, data))
		fs.readFile( viewUrl, "binary", ( err, data ) => {
			if( err ) {
				reject( err )
			}else {
				resolve( data )
			}
		} )
	} )
}

//根据url获取html内容
async function route( url ) {
	let view = "404.html"
	switch ( url ) {
		case "/":
			view = "index.html"
			break
		case "/index":
			view = "index.html"
			break
		case "/todo":
			view = "todo.html"
			break
		case "/404":
			view = "404.html"
			break
	}
	let html = await render( view )
	return html
}

app.use( async ( ctx ) => {
	let url = ctx.request.url   //请求的url	
	let html = await route( url )
	ctx.body = html     		//页面显示文件内容
} )

app.listen(2000)