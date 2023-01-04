import { UserRoomsRepository } from "../../../repositories/interfaces/rooms/user-rooms/user-rooms-repository";
import { RoomsRepository } from "../../../repositories/interfaces/rooms/rooms-repository";

// Interface
interface AddUserRoomSocketRequest {
  id_room: string;
  id_socket: string;
  id_connected: string;
}

// Service
export class AddUserRoomSocketService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private userRoomsRepository: UserRoomsRepository,
    private roomsRepository: RoomsRepository,
  ) {}

  // Executando o service
  async execute(request: AddUserRoomSocketRequest) {
    
    // Dados do service
    const { id_room, id_socket, id_connected } = request;

    console.log(id_room)
    console.log(id_socket)
    console.log(id_connected)

    // Verificando se a sala existe
    if(!(await this.roomsRepository.find({ id: id_room }))){
      return new Error("Sala inexistente!");
    }

    // Atualizando ...
    const room = await this.userRoomsRepository.addUser({
      id_room,
      id_socket,
      id_connected
    })

    // Retornando dado criado para o controller
    return room;
  }
}