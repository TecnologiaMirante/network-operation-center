import { UserRoomsRepository } from "../../../repositories/interfaces/rooms/user-rooms/user-rooms-repository";

// Interface
interface AddUserRoomSocketRequest {
  id: string;
  id_socket: string;
  id_connected: string;
}

// Service
export class AddUserRoomSocketService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private userRoomsRepository: UserRoomsRepository,
  ) {}

  // Executando o service
  async execute(request: AddUserRoomSocketRequest) {
    
    // Dados do service
    const { id, id_socket, id_connected } = request;

    // Verificando se a sala existe
    if(!(await this.userRoomsRepository.find({ id }))){
      return new Error("Sala inexistente!");
    }

    // Atualizando ...
    const room = await this.userRoomsRepository.addUser({
      id, 
      id_socket,
      id_connected
    })

    // Retornando dado criado para o controller
    return room;
  }
}