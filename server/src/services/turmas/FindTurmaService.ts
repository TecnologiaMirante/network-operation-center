import { TurmasRepository } from "../../repositories/interfaces/turmas/turmas-repository";

// Interface do createTurma
interface FindTurmaRequest {
  id: string
}

// Service
export class FindTurmaService {
  
  // Recebendo o repositório da Turma no construtor
  constructor(
    private turmasRepository: TurmasRepository,
  ) {}

  // Executando o service
  async execute(request: FindTurmaRequest) {
    
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

    return turma;
  }
}