import { ProgressosRepository } from "../../repositories/interfaces/progressos/progressos-repository";
import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";

// Interface do createProfessor
interface FindProgressoRequest {
  id: string;
}

// Service
export class FindProgressoService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private progressosRepository: ProgressosRepository,
    private alunosRepository: AlunosRepository,
    private aulasRepository: AulasRepository,
  ) {}

  // Executando o service
  async execute(request: FindProgressoRequest) {
    
    // Dados do service
    const { id } = request;

    try {
      // Criando ...
      const progresso = await this.progressosRepository.find({
          id,
      })

      if (!progresso) {
        return new Error("Progresso inexistente!")
      }
  
      return progresso;
    } catch (err) {
      return err
    }
  }
}