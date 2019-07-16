// EventEmitter监听多事件
let EventEmitter = require('events').EventEmitter;
let event = new EventEmitter();
event.on('some_event', function (arg1, arg2) {
    console.log('listerer1', arg1, arg2);
});
event.on('some_event', function (arg1, arg2) {
    console.log('listerer2', arg1, arg2);
});
event.emit('some_event', 'arg1参数', 'arg2参数');

