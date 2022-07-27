const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
server.listen(3001, () => {
  console.log("server up and running");
});
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (data) => {
    console.log(data.message);
  });
});
// io.on("message", (data) => {
//   console.log(data.message);
// });
