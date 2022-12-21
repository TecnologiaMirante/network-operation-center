import { RoomsRepository } from "../../repositories/interfaces/rooms/rooms-repository";
import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";

// Interface
interface CreateRoomRequest {
  id_aluno: string;
  id_professor: string;
}

// Service
export class CreateRoomService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private roomsRepository: RoomsRepository,
    private alunosRepository: AlunosRepository,
    private professoresRepository: ProfessoresRepository,
  ) {}

  // Executando o service
  async execute(request: CreateRoomRequest) {
    
    // Dados do service
    const { id_aluno, id_professor } = request;

    // Verificando se o aluno existe
    if(!(await this.alunosRepository.find({id: id_aluno}))){
      return new Error("Aluno inexistente!");
    }

    // Verificando se a atividade existe
    if(!(await this.professoresRepository.find({id: id_professor}))){
      return new Error("Professor inexistente!");
    }

    // Criando ...
    const favorito = await this.roomsRepository.create({
      id_aluno, 
      id_professor,
    })

    // Retornando dado criado para o controller
    return favorito;
  }
}