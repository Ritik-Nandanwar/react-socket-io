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
//when we establish a connection/'socket' , we can then use the socket variable to receive and transmit various events
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (data) => {
    console.log(data.message);
  });
});
