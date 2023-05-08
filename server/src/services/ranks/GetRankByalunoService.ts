import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { RanksRepository } from "../../repositories/interfaces/ranks/ranks-repository";

// Interface
interface GetRankByAlunoRequest {
  id_aluno: string;
}

// Service
export class GetRankByAlunoService {
  
  // Recebendo o repositório da Rank no construtor
  constructor(
    private ranksRepository: RanksRepository,
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: GetRankByAlunoRequest) {
    
    // Dados do service
    const { id_aluno } = request;

    try {
        // Verificando se o aluno existe
        if (!(await this.alunosRepository.find({ id:id_aluno }))) {
            return new Error("Aluno inexistente!")
        }
        
        // Pegando os dados
        const rank = await this.ranksRepository.getByAluno({ id_aluno });
        return rank;
    } catch (err) {
      return err;
    }
  }
}