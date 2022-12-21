import { io } from "./http";

interface definitionInterface{
  (message:string):void;
}

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("update item", (arg1: number, arg2: number, callback: definitionInterface) => {
      console.log(arg1); // 1
      console.log(arg2); // { name: "updated" }
      callback(
        "ok"
      );
    });

    // Quando o aluno se conectar, ele vai enviar o id dele e o do professor
    socket.on("select_room", (data, callback) => {
      console.log(data);

      let raw = "teste"

      callback({
        status: "ok"
      })

    });
  
    socket.on("send_message", (data) => {
      console.log("received message in server side", data);
      io.emit("received_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });