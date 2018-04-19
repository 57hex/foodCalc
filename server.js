const me = '資工一1 許皇琪學號2410632041'
const one = [1,2,3,4,5,6,7,8,9];
let test = [];
let iTest = []
let i = [];
for (const obj of one) {
  for (const obj2 of one) {
    test.push(obj*obj2);
  }
  test123456789 = test.join(" ")
  i.push(test123456789);
  test = [];
}
let app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs');
app.listen(8124, '0.0.0.0');
function handler(req, res) {
  fs.readFile('chat.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading chat.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}
io.sockets.on('connection', (socket) => {
  socket.on('addme', (jsonMessage) => {
    console.log(`${JSON.stringify(jsonMessage.name)}登入`);
    socket.username = jsonMessage.name;
    const toClient = { sender: 'SERVER', message: `歡迎${jsonMessage.name}`};
    socket.emit('chat', toClient);
    toClient.message = `${jsonMessage.name} 上線了`;
    socket.broadcast.emit('chat', toClient);
  });
  socket.on('sendChat', function (data) {
    if (data.message === '1') {
      socket.emit('chat', {sender : 'admin', message : '安安吃飽ㄌㄇ'});
    } else if (data.message === '2') {
      socket.emit('chat', {sender : 'admin', message: '晚ㄤ'});
    } else if (data.message === '99') {
      socket.emit('chat', {sender : 'admin', message: `<br>${i.join('<br>')}`});
    } else if (data.message === 'profile') {
      socket.emit('chat', {sender : 'admin', message: me})
    }
    console.log(`送過來${JSON.stringify(data)}`);
    io.sockets.emit('chat', {sender : socket.username, message: data.message});
  });
  socket.on('disconnect', () => {
    const sayonara = {sender: 'SERVER', message : `${socket.username} 離線`};
  });
});
