import { TurmasRepository } from "../../repositories/interfaces/turmas/turmas-repository";

// Service
export class GetTurmasService {
  
  // Recebendo o repositório da Turma no construtor
  constructor(
    private turmasRepository: TurmasRepository,
  ) {}

  // Executando o service
  async execute() {
    
    // Buscando ...
    const turmas = await this.turmasRepository.get()

    // Se não existir 
    if (Object.keys(turmas).length == 0) {
      return new Error("Nenhuma turma cadastrada!");
    }

    // Se der tudo certo, retorna para o controller os dados encontrados
    return turmas;
  }
}