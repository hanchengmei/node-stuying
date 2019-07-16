//遍历读取目录内容（子目录，文件名）

const fs = require('fs')
const mimes = require('./mimes')

function walk( reqPath ) { //reqPath-->请求资源的绝对路径
	let files = fs.readdirSync( reqPath )
	let dirList = [] ,
		fileList = [];
	for(let i=0, len=files.length; i<len; i++) {
		let item = files[i];
		let itemArr = item.split('\.');
		//itemArr有值，itemMime=itemArr最后一个
		let itemMime = ( itemArr.length > 1 ) ? itemArr[ itemArr.length -1 ] : "undefined";

		if( typeof mimes[ itemMime ] === "undefined" ) {
			dirList.push( files[i] );
		}else {
			fileList.push( files[i] );
		}
	}

	let result = dirList.concat( fileList );
	return result;	//result->目录内容列表
};

module.exports = walk