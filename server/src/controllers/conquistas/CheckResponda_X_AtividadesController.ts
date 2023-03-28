import { Socket } from "socket.io";
import { io } from "../../http";

export class CheckResponda_X_AtividadesController {
    
    async handle(socket: Socket) {
        
        console.log("CheckResponda_X_AtividadesController");

        const teste = "SelectRoomSocketController FUNCIONOU";
        socket.emit("RESPONDA_X_ATIVIDADE", teste);

    }
}