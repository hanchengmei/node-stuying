// 判断是否是错误对象
var util = require('util');

console.log(util.isError(new Error())); // true
console.log(util.isError(new TypeError())); // true
console.log(util.isError({ name: 'Error', message: 'an error occurred' })); // false
