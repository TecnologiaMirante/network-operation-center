import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";

// Interface
interface GetLastAulasRequest {
  id_aluno: string;
}

// Service
export class GetLastAulasService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private aulasRepository: AulasRepository,
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: GetLastAulasRequest) {
    
    // Dados do service
    const { id_aluno } = request;

    try {
      // Buscando ...
      const aluno = await this.alunosRepository.find({
        id: id_aluno, 
      })

      // Se o aluno não existe
      if (!aluno) {
        return new Error("Aluno inexistente!");
      }

      // Verificando as últimas aulas vistas pelo aluno
      try {
        const lastAulas = await this.aulasRepository.getLastAulas({
          id_aluno
        });

        return lastAulas;
      } catch (err) {
        return err;
      }

    } catch (err) {
      return err;
    }
  }
}