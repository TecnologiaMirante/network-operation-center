import { RoomsRepository } from "../../../repositories/interfaces/rooms/rooms-repository";
import { UserRoomsRepository } from "../../../repositories/interfaces/rooms/user-rooms/user-rooms-repository";

// Interface
interface UpdateRoomSocketRequest {
  id_room: string;
  id_socket: string;
  id_connected: string;
}

// Service
export class UpdateRoomSocketService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private userRoomsRepository: UserRoomsRepository,
    private roomsRepository: RoomsRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateRoomSocketRequest) {
    
    // Dados do service
    const { id_room, id_socket, id_connected } = request;

    // Verificando se o aluno existe
    if(!(await this.roomsRepository.find({ id: id_room }))){
      return new Error("Sala inexistente!");
    }

    // Atualizando ...
    const room = await this.userRoomsRepository.updateSocketUserRoom({
      id_room,
      id_socket,
      id_connected
    })

    // Retornando dado criado para o controller
    return room;
  }
}