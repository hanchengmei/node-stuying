// eventEmitter方法、事件
let events = require('events');
let eventEmitter = new events.EventEmitter();

// 监听器1
let listener1 = function listener1() {
    console.log('监听器listener1');
};
// 监听器2
let listener2 = function listener2() {
    console.log('监听器listener2');
};

// 绑定connection事件，处理函数为listerer1
eventEmitter.addListener('connection', listener1);
// 绑定connection事件，处理函数为listener2
eventEmitter.on('connection', listener2);

// 获取connection事件的监听器个数
let eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + '个监听器监听连接事件');

// 触发connection事件
eventEmitter.emit('connection');

// 移除绑定listener1函数
eventEmitter.removeListener('connection', listener1);
console.log('listener1不再受监听');

// 触发connection事件
eventEmitter.emit('connection');

// 获取connection事件的监听器个数
eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + '个监听器监听连接事件');

console.log('程序执行完毕');

