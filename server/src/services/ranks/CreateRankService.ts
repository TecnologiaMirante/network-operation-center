import { RanksRepository } from "../../repositories/interfaces/ranks/ranks-repository";

// Interface
interface CreateRankRequest {
  id_aluno: string;
  points: number;
}

// Service
export class CreateRankService {
  
  // Recebendo o repositório da Rank no construtor
  constructor(
    private ranksRepository: RanksRepository,
  ) {}

  // Executando o service
  async execute(request: CreateRankRequest) {
    
    // Dados do service
    const { id_aluno, points } = request;

    try {
      // Criando ...
      const rank = await this.ranksRepository.create({
        id_aluno,
        points
      })

      return rank;

    } catch (err) {
      return err;
    }

  }
}