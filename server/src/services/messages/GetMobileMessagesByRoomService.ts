import { RoomsRepository } from "../../repositories/interfaces/rooms/rooms-repository";
import { MessagesRepository } from "../../repositories/interfaces/messages/messages-repository";

// Interface
interface GetMobileMessagesByRoomRequest {
  id_room: string;
}

// Service
export class GetMobileMessagesByRoomService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private roomsRepository: RoomsRepository,
    private messagesRepository: MessagesRepository,
  ) {}

  // Executando o service
  async execute(request: GetMobileMessagesByRoomRequest) {
    
    // Dados do service
    const { id_room } = request;

    // Verificando se a sala existe
    if(!(await this.roomsRepository.find({id: id_room}))){
      return new Error("Sala inexistente!");
    }
    // DESCOMENTAR QUANDO O SOCKET ESTIVER NO SERVIDOR !!!
    // // Verificando se a sala existe
    // if(!(await this.roomsRepository.find({id: id_room}))){
    //   return new Error("Sala inexistente!");
    // }


    // Buscando ...
    const messages = await this.messagesRepository.getMobileMessagesByRoom({
      id_room,
    })

    // Retornando dado criado para o controller
    return messages;
  }
}