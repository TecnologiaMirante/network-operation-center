import { UserRoomsRepository } from "../../../repositories/interfaces/rooms/user-rooms/user-rooms-repository";
import { RoomsRepository } from "../../../repositories/interfaces/rooms/rooms-repository";

// Interface
interface UserIsInRoomSocketRequest {
  id_room: string;
  id_connected: string;
}

// Service
export class UserIsInRoomSocketService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private userRoomsRepository: UserRoomsRepository,
    private roomsRepository: RoomsRepository,
  ) {}

  // Executando o service
  async execute(request: UserIsInRoomSocketRequest) {
    
    // Dados do service
    const { id_room, id_connected } = request;

    // verificar se a sala existe
    if(!(await this.roomsRepository.find({ id: id_room }))){
      return new Error("Sala inexistente!");
    }
    
    // Buscando ...
    const room = await this.userRoomsRepository.isInUserRoom({
      id_room, 
      id_connected
    })    

    // Retornando dado encontrado para o controller
    return room;
  }
}