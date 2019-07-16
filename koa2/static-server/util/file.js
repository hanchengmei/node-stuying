//获取filePath下的文件内容

const fs = require('fs')

function file( filePath ) {
	//readFileSync(文件路径，编码格式,回调(err,data))
	let content = fs.readFileSync( filePath, "binary")
	return content;
}	

module.exports = file