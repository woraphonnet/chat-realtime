const Express = require('express')
const app = new Express()

const http = require('http').Server(app)

const io = require('socket.io')(http)

const port = 3001

let users = [];
io.on('connection', function (socket) {
  console.log('connected : ID =>', socket.id)
  // socket.on('is_user_connected',(usename)=>{
  //   io.emit("is_online",`<span class="ec ec-large-blue-circle"></span> ${usename} join connected chat...`)
  // })
  // create name
  socket.on('setUserName', (data) => {
    if (users.indexOf(data) == -1) {
      users.push(data);
      socket.emit('userSet', {
        username: data,
        status: 'Y'
      })
    } else {
      socket.emit('userSet', {
        username: null,
        status: 'N'
      })
    }
  })
  socket.on('sendMessage', (msg) => {
    io.emit('sendMessage', msg)
  })
  // get name
  socket.on('getuser', (data) => {
    if (users.indexOf(data) > -1) {
      socket.emit('user', {
        username: data,
        status: 'Y'
      })
    } else {
      socket.emit('user', {
        username: null,
        status: 'N'
      })
    }
  });
  socket.on('disconnect', function () {
    console.log('user disconnected : ID=>', socket.id);
    // io.emit("is_online",`<span class="ec ec-red-circle"></span> ${usename} join disconnected chat...`)
  });
})

http.listen(port, function () {
  console.log('Socket run on port:', port)
})
