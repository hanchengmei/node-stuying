//post原生请求数据
const Koa = require("koa")
const app = new Koa

app.use( async ( ctx ) => {
	if( ctx.url ==="/" && ctx.method === "GET" ) {
		//当请求是GET时在页面上显示表单
		let html = `
			<h1>koa2 request post demo</h1>
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
	}else if( ctx.url === "/" && ctx.method === "POST" ) {
		//当请求是POST时，解析post表单中的数据，并显示
		let postData = await parsePostData( ctx )
		ctx.body = postData
	}else {
		//其他请求显示404
		ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
	}
} )

//解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
	return new Promise( (resolve, reject) => {
		try{
			let postdata = ""
			ctx.req.addListener( 'data', (data) => {
				postdata += data
			} )
			ctx.req.addListener( 'end', function() {
				let parseData = parseQueryStr( postdata )
				resolve(parseData)
			})
		}catch ( err ) {
			reject (err)
		}
	} )
}

//将POST请求的参数字符串解析成json
//queryStr: a=1&b=2
function parseQueryStr( queryStr ) {
	let queryData = {}
	let queryStrList = queryStr.split('&') //["a=1","b=2"]
	console.log(queryStrList)
	//entries()返回新的array iterator对象，该对象中包含数组中的每个索引的键值对
	//array iterator的原型上有next(),用于遍历地带去取得原数组的[key, value]
	//['a','b'].entries().next().value -->[0,'a'] [1,'b']
	for( let [ index, queryStr ] of queryStrList.entries() ) {
		console.log(queryStr)
		//queryStr-->a=1   b=2
		//若for( let item of queryStrList.entries() ) {...}
		//item---> [0, 'a=1']  [1,'b=2']
		let itemList = queryStr.split('=')
		queryData[ itemList[0] ] = decodeURIComponent( itemList[1] )
	}
	return queryData
}

app.listen(2000)







































