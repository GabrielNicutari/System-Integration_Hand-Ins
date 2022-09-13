import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let array = [
  {
    email: "john_doe@gmail.com",
    name: "John Doe",
    status: "Not Registered",
  },
  {
    email: "jane_doe@gmail.com",
    name: "Jane Doe",
    status: "Not Registered",
  },
  {
    email: "mark_gilbert@gmail.com",
    name: "Mark Gilbert",
    status: "Not Registered",
  },
];

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("fetchList", array);

  socket.on("checkMail", (data) => {
    const user = array.find((obj) => obj.email === data);

    const userIndex = array.findIndex((obj) => obj.email === data);

    console.log(user);

    if (userIndex !== -1) {
      array[userIndex].status = "Online";
      array[userIndex].socketId = socket.id;
    }

    io.emit("fetchList", array);
    io.emit("info", `User ${array[userIndex].name} has connected.`);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
    console.log(socket.id);

    const userIndex = array.findIndex((obj) => obj.socketId === socket.id);
    if (userIndex !== -1) {
      array[userIndex].status = "Offline";
      delete array[userIndex].socketId;
    }

    io.emit("fetchList", array);
    io.emit("info", `User ${array[userIndex].name} has disconnected.`);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port", 3000);
});
