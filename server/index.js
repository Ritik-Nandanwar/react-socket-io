const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(3001, () => {
  console.log("running the backend G");
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  socket.on("join_room", ({ data }) => {
    console.log(`username is ${data.username} and roomId is ${data.roomId}`);
  });
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});
