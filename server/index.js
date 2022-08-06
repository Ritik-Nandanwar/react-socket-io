const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
app.use(cors());
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(3001, () => {
  console.log("Server up and running");
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  socket.on("joinRoom", ({ username, roomID }) => {
    socket.join(roomID);
  });
  socket.on("sendMessage", (data) => {
    socket.to(data.roomID).emit("receiveMsg", data);
  });
});
