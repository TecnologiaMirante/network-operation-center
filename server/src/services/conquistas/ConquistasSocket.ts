import { io } from "../../http";

io.on("connection", (socket) => {
    console.log("Connection established");

    socket.on("alcance_a_media_x", () => {
        
    })
})