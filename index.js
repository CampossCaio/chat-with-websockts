const express = require('express');
const http = require('node:http')
const { Server  } = require('socket.io')

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/public/'));

const server = http.createServer(app)

const io = new Server(server)

const connectedUsers = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/');
});

io.on('connection', (socket) => {
 
  const user = {
    nickname: socket.handshake.query.nickname,
  }

  connectedUsers[user] = socket;
  console.log(`${socket.handshake.query.nickname} joined the chat`)

  socket.on('disconnect', () => {
    console.log(`${socket.handshake.query.nickname} left the chat`);
  });

  socket.on('message', (msg) => {
    const data = {
      id: socket.id,
      nickname: socket.handshake.query.nickname,
      message: {
        text: msg.text,
        date: msg.date
      },
    }

    io.emit('message', data)
  })
})

server.listen(3000, () => {
  console.log(`Server is running at ${PORT} 🚀`);
});