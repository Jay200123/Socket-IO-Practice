import { io } from "socket.io-client";
import { Server } from "socket.io";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

//establish new client server
const server = new Server(process.env.SERVER_PORT, {
  cors: {
    origin: "*",
  },
});

server.on("connection", (socket) => {
  console.log("New client connected");

  socket.emit("welcome", "Hello from server");

  socket.on("message", (data) => {
    console.log(data);
    socket.emit("sendSMsg", "Hi postman!");
  });

  socket.on("sendSMsg", (data) => {
    console.log(data);
  });


  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

//client connecting to other server
const socket = new io("ws://192.168.100.4:8081");

socket.on("connect", () => {
  console.log("Connected to server");
});

app.listen(process.env.PORT, () => {
  console.log(`Client socket running on port ${process.env.PORT}`);
});
