const Koa = require("koa")
const app = new Koa

app.use( async (ctx) => {
	if( ctx.url == "/index" ) {
		//url->http://localhost:3000/index
		//页面显示 cookie is ok
		ctx.cookies.set(
			'cid' ,
			"hello world" ,
			{
				domain 	: 'lacalhost' ,	//写cookie所在的域名
				path 	: '/index' ,		//写cookie所在的路径
				maxAge 	: 10*60*1000 ,	//cookie有效时长
				expires : new Date('2017-02-15') , //cookie失效时间
				httpOnly 	: false ,	//是否用于http请求中获取
				overwrite 	: false  //是否允许重写
			}
		)
		ctx.body = 'cookie is ok'
	}else {
		//url 为其他
		//显示 hello world
		ctx.body = "hello world"
	}
} )

app.listen(3000)