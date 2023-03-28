import { Socket } from "socket.io";

export class SelectRoomSocketController {
    async handle(socket: Socket) {
        
        console.log("SelectRoomSocketControLler");

        const teste = "SelectRoomSocketController FUNCIONOU";
        socket.emit("RESPONDA_X_ATIVIDADE", teste);

    }
}