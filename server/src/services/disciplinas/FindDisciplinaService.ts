import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface do createDisciplina
interface FindDisciplinaRequest {
  id: string;
}

// Service
export class FindDisciplinaService {
  
  // Recebendo o repositório da Disciplina no construtor
  constructor(
    private disciplinasRepository: DisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: FindDisciplinaRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const disciplina = await this.disciplinasRepository.find({
      id,
    })

    // Se não existir 
    if (!disciplina) {
      return new Error("Disciplina inexistente!");
    }

    return disciplina;
  }
}