import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface do deleteDisciplina
interface DeleteDisciplinaRequest {
  id: string;
}

// Service
export class DeleteDisciplinaService {
  
  // Recebendo o repositório da Disciplina no construtor
  constructor(
    private disciplinasRepository: DisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteDisciplinaRequest) {
    
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

    // Deletando a disciplina encontrada ...
    return this.disciplinasRepository.delete({id});
  }
}