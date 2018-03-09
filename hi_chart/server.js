var express = require('express');
var app = express();
// 一种新的启动服务器的方式
var server = require('http').createServer(app);
// 支持多人聊天的服务
var io = require('socket.io').listen(server);
var users = [];
// 静态服务器
app.use('/', express.static(__dirname + '/www'));
server.listen(3000);

// socket 是实时通信 RealTime 核心， http协议是无法长连接的， 一旦送达， 立马断开
// ajax（长期轮询） 提交， 或者再提交get/post 请求
// iframe
io.sockets.on('connection', function(socket) {
    socket.on('login', function(nickname) {
        console.log(nickname);
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length)
        }
    })
})