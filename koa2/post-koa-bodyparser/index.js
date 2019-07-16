const Koa = require("koa")
const app = new Koa()
const bodyParser = require('koa-bodyparser')

//使用ctx.body解析中间件
app.use( bodyParser() )

app.use( async ( ctx ) => {
	if( ctx.url === '/' && ctx.method === 'GET') {
		//当请求是GET时在页面上显示表单
		let html =`
		    <form method="POST" action="/">
		        <p>userName</p>
		        <input name="userName" /><br/>
		        <p>nickName</p>
		        <input name="nickName" /><br/>
		        <p>email</p>
		        <input name="email" /><br/>
		        <button type="submit">submit</button>
		    </form>
		`
		ctx.body = html
	}else if( ctx.url === '/' && ctx.method === "POST" ) {
		//当请求是POST时，中间件koa-bodyparser解析POST表单的数据，并显示
		let postData = ctx.request.body
		ctx.body = postData
	}else {
		//其他请求显示404
		ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
	}
} )

app.listen(3000 , () => {
	console.log('[demo] request post is starting at port 3000')
} )