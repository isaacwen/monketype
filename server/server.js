const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on("connection", (socket) => {
  socket.on("check-room-exists", async (roomId) => {
    socket.emit("check-room-exists-response", io.sockets.adapter.rooms[roomId])
  });
})