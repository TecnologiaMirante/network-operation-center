import { RoomsRepository } from "../../repositories/interfaces/rooms/rooms-repository";

// Interface
interface FindByNameRoomRequest {
  id_name: string;
}

// Service
export class FindByNameRoomService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private roomsRepository: RoomsRepository,
  ) {}

  // Executando o service
  async execute(request: FindByNameRoomRequest) {
    
    // Dados do service
    const { id_name } = request;

    // Verificando se a sala existe
    const room = await this.roomsRepository.findByName({id_name});
    
    return room;
  }
}