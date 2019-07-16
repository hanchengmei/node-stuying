const Koa = require("koa")
const fs = require("fs")
const app = new Koa()

const Router = require("koa-router")

//子路由1
let home = new Router
home.get("/", async( ctx ) => {
	let html = `
		<ul>
			<li><a href="/page/helloworld">/page/helloworld</a></li>
			<li><a href="/page/404">/page/404</a></li>
		</ul>
	`
	ctx.body = html
} )

//子路由2
let page = new Router()
page.get("/404", async( ctx ) => {
	ctx.body = "404 page!"
} ).get("/helloworld", async( ctx ) => {
	ctx.body = "helloworld page!"
} )

//装载所有子路由
let router = new Router()
router.use("/", home.routes(), home.allowedMethods())
router.use("/page", page.routes(), page.allowedMethods())  //page的路由放到/page下
										//url为/page/404 显示404 page!
										//url为/page/helloworld 显示helloworld page!

//加载路由中间件
app
	.use(router.routes())			//启动路由
	.use(router.allowedMethods())	//自动设置响应头

app.listen( 2000, () => {
	console.log('[demo] route-use-middleware is starting at port 3000')
} )