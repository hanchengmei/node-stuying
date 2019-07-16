// 实现对象间原型继承的函数
var util = require('util');

function Base() {
    this.name = 'base';
    this.sayHello = function () {
        console.log('hello' + this.name);
    };
};

Base.prototype.showName = function () {
    console.log(this.name);
};

function Sub() {
    this.name = 'sub';
}

util.inherits(Sub, Base);

var objSub = new Sub();

objSub.showName() // sub
// 只能继承原型上的，不能继承Base构造函数内部定义的


