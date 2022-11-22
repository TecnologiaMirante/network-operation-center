import { TurmasRepository } from "../../repositories/interfaces/turmas/turmas-repository";

// Interface do deleteTurma
interface DeleteTurmaRequest {
  id: string
}

// Service
export class DeleteTurmaService {
  
  // Recebendo o repositório da Turma no construtor
  constructor(
    private turmasRepository: TurmasRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteTurmaRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const turma = await this.turmasRepository.find({
      id,
    })

    // Se não existir 
    if (!turma) {
      return new Error("Turma inexistente!");
    }

    // Deletando a turma encontrada ...
    return this.turmasRepository.delete({id});
  }
}