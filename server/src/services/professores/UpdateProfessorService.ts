import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";

// Interface do updateProfessor
interface UpdateProfessorRequest {
  id: string;
  education?: string;
  experience?: string;
  description?: string;
  id_escola_user?: string;
}

// Service
export class UpdateProfessorService {

  // Recebendo o repositório da Professor no constructor
  constructor(
    private professoresRepository: ProfessoresRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateProfessorRequest) {

    // Dados do service
    const { id, education, experience, description, id_escola_user } = request;

    if (id_escola_user) {
      // Verificando se o professor existe
      if(!(await this.professoresRepository.find({id}))){
        return new Error("Professor inexistente!");
      }
    }
    // Atualizando a Professor
    await this.professoresRepository.update({id, education, experience, description, id_escola_user });

    return;
  }
}