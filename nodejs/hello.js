function hello() {
    let name;
    this.setName = function (thyName) {
        name = thyName;
    };
    this.sayName = function () {
        console.log('hello ' + name);
    };
};

module.exports = hello;
