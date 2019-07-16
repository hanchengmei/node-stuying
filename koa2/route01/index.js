const Koa = require("koa")
const app = new Koa()

app.use( async ( ctx ) => {
	let url = ctx.request.url  //请求的地址
	ctx.body =  url + "您好"		//页面中显示地址
} )

app.listen(2000)