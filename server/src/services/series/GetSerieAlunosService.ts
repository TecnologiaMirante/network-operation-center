import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";

// Interface
interface GetSerieAlunosRequest {
  id: string;
}

// Service
export class GetSerieAlunosService {
  
  // Recebendo o repositório da Serie no construtor
  constructor(
    private seriesRepository: SeriesRepository,
  ) {}

  // Executando o service
  async execute(request: GetSerieAlunosRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const alunos = await this.seriesRepository.getAlunos({
      id, 
    })

    // Se não existir 
    if (!alunos) {
      return new Error("Nenhum aluno matriculado nesta turma!");
    }

    return alunos;
  }
}