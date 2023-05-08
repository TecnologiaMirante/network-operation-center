import { RoomsRepository } from "../../repositories/interfaces/rooms/rooms-repository";
import { EscolaUsersRepository } from "../../repositories/interfaces/escolas/escolas-users-repository";
import { MessagesRepository } from "../../repositories/interfaces/messages/messages-repository";

// Interface
interface CreateMessageRequest {
  id_room: string;
  id_user: string;
  text: string;
}

// Service
export class CreateMessageService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private roomsRepository: RoomsRepository,
    private escolaUsersRepository: EscolaUsersRepository,
    private messagesRepository: MessagesRepository,
  ) {}

  // Executando o service
  async execute(request: CreateMessageRequest) {
    
    // Dados do service
    const { id_room, id_user, text } = request;

    // Verificando se o aluno existe
    if(!(await this.escolaUsersRepository.find({id: id_user}))){
      return new Error("Usuário inexistente!");
    }
    // DESCOMENTAR QUANDO O SOCKET ESTIVER NO SERVIDOR !!!
    // // Verificando se a sala existe
    // if(!(await this.roomsRepository.find({id: id_room}))){
    //   return new Error("Sala inexistente!");
    // }


    // Criando ...
    const message = await this.messagesRepository.create({
      id_room,
      id_user,
      text
    })

    // Retornando dado criado para o controller
    return message;
  }
}