import { Server } from "socket.io";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const io = new Server(process.env.SOCKET_PORT, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("message", (msg) => {
    console.log("Message: " + msg);
  });
});

io.on("error", (err) => {
  console.log(err);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
