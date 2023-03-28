import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";

// Interface do DeleteProfessor
interface DeleteProfessorServiceRequest {
  id: string;
}

// Service
export class DeleteProfessorService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professoresRepository: ProfessoresRepository,
  ) {}

  // Executando o service
  async execute({ id }: DeleteProfessorServiceRequest) {
    
    // Buscando 
    const professor = await this.professoresRepository.find({id});

    // Se não existir 
    if (!professor) {
      return new Error("Professor inexistente!");
    }

    // Deletando o Professor encontrado ...
    return await this.professoresRepository.delete({id});
  }
}