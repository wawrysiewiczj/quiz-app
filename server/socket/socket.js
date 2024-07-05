const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000/"],
    methods: ["Get", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });

  socket.on("message", (message) => {
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});

export { app, io, server };
