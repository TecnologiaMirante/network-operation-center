import { UserRoomsRepository } from "../../../repositories/interfaces/rooms/user-rooms/user-rooms-repository";

// Interface
interface CreateUserRoomSocketRequest {
  id_room: string;
  id_socket: string;
  id_connected: string;
}

// Service
export class CreateUserRoomSocketService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private userRoomsRepository: UserRoomsRepository,
  ) {}

  // Executando o service
  async execute(request: CreateUserRoomSocketRequest) {
    
    // Dados do service
    const { id_room, id_socket, id_connected } = request;

    // Criando ...
    const room = await this.userRoomsRepository.create({
      id_room, 
      id_socket,
      id_connected
    })

    console.log(room);


    // Retornando dado criado para o controller
    return room;
  }
}