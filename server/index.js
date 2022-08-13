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

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  socket.on("joinRoom", ({ username, roomID }) => {
    socket.join(roomID);
  });
  socket.on("sendMessage", (data) => {
    console.log(data);
    socket.to(data.roomID).emit("receiveMsg", data);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server up and running");
});
