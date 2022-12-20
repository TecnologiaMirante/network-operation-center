import { io } from "./http";

io.on("connection", (socket) => {
    console.log("a user connected");
  
    socket.on("send_message", (data) => {
      console.log("received message in server side", data);
      io.emit("received_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });