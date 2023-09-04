const express = require('express')
const app = express()
const http = require('http');
const pg = require('pg');
const cors = require('cors')
const addRoute = require('./source/routes');
const pool = require('./db');
const { Socket } = require('socket.io');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
//запомни если открты креденталы то тру
app.use(cors({origin:true,credentials:true}))
//не забывать эти сетапы супер важны
app.use(express.json())

/*io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});*/
const rooms = []
const users = []
  io.on('connection', (socket) => {
    console.log(`Новый клиент подключился ${socket.id}`)
    socket.on('room_name',(room)=>{
      rooms.push(room)
socket.join(room)
console.log(`СОЗДАНА КОМНАТА ${room} `)
socket.emit('avialible_room',rooms)
    }
    )
    socket.on('join_room',(room)=>{
      if(rooms.includes(room)){
        socket.join(room)
        console.log(`room joined ${room} `)
    }
    else{
      console.err('no such room')
    }})
    socket.on('message',(data)=>{
      console.log(`message: ${data.message} emited to ${data.to}`)
      io.sockets.in(data.to).emit("message",data.message)
    })
  
    // Обработчик для отключения клиента
    socket.on('disconnect', () => {
      console.log('Клиент отключился');
      const updatedUsers = users.filter((user) => user.socketID !== socket.id);
      // console.log(users);
      //Sends the list of users to the client
      socket.emit('newUserResponse', updatedUsers);
    });
  });
const port = 4000
app.use('/users',addRoute)
server.listen(port, () => {
  console.log(`Express.js запущен на порте ${port} 🃏`);
});
//pnpm run dev
