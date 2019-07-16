const Koa = require('koa')
const app = new Koa()

app.use( async (ctx) => {
	if( ctx.method == "GET" && ctx.url.split('?')[0] === "/getData.jsonp" ) {
		//若请求是get并且请求地址中有"/getData.jsonp"

		//获取请求的callback
		let callbackName = ctx.query.callback || "callback"
		let returnData = {
			success : true ,
			data : {
				txt : "this os a jsonp api" ,
				time : new Date().getTime()
			}
		}
		//jsonp的script字符串
		//格式： success( res )
		let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
		//用text/javascript, 让请求支持跨域获取
		ctx.type = "text/javascript"
		//输出jsonp字符串
		ctx.body = ctx.query
	}else {
		ctx.body = "hello jsonp"
	}
} )

app.listen(3000)

//在https://www.sina.com.cn/的console中输入以下代码，会将returnData输出
// $.ajax({
// 	url : 'http://localhost:3000/getData.jsonp' ,
// 	type : 'GET',
// 	dataType : "JSONP",
// 	success: function( res ) {
// 		console.log( res )
// 	}
// })