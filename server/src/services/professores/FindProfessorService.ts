import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";

// Interface do findProfessor
interface FindProfessorServiceRequest {
  id: string;
}

// Service
export class FindProfessorService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professoresRepository: ProfessoresRepository,
  ) {}

  // Executando o service
  async execute({ id }: FindProfessorServiceRequest) {
    
    // Buscando 
    const professor = await this.professoresRepository.find({id});

    // Se não existir 
    if (!professor) {
      return new Error("Professor inexistente!");
    }

    // Retornando o Professor encontrado ...
    return professor;
  }
}