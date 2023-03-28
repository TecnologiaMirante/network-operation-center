import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { EscolaUsersRepository } from "../../repositories/interfaces/escolas/escolas-users-repository";

// Interface do createProfessor
interface CreateProfessorRequest {
  education: string;
  experience: string;
  description: string;
  id_escola_user: string;
}

// Service
export class CreateProfessorService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professoresRepository: ProfessoresRepository,
    private escolaUsersRepository: EscolaUsersRepository,
  ) {}

  // Executando o service
  async execute(request: CreateProfessorRequest) {
    
    // Dados do service
    const { education, experience, description, id_escola_user } = request;


    if (id_escola_user) {
      // Verificando se o usuário existe
      if(!(await this.escolaUsersRepository.find({id: id_escola_user}))){
        return new Error("Usuário inexistente!");
      }
    }

    // Criando ...
    const professor = await this.professoresRepository.create({
      education,
      experience,
      description,
      id_escola_user
    })

    return professor;
  }
}