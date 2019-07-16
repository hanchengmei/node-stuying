const url = require('url')
const fs = require('fs')
const path = require('path')

const walk = require('./walk') //返回某路径下的目录内容列表

//url->当前请求的上下文中的url, 即ctx.url
//reqPath->请求静态资源的完整本地路径
//返回目录内容，封装成html（目录名称用html列出）
function dir( url, reqPath ) {
	let contentList = walk( reqPath ) //获取目录下的文件，子目录 数组
	let html = `<ul>`
	for(let [ index, item ] of contentList.entries() ) {
		html = `${ html }<li><a href="${ url === '/' ? '' : url }/${ item }">${ item }</a>`
	}
	html = `${ html }</ul>`

	return html
}

module.exports = dir















