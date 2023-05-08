import { RankImgsRepository } from "../../../repositories/interfaces/ranks/rank-imgs-repository";

// Interface
interface CreateRankImgRequest {
    first: string;
    second: string;
    third: string;
}

// Service
export class CreateRankImgService {
  
  // Recebendo o repositório da Rank no construtor
  constructor(
    private rankImgsRepository: RankImgsRepository,
  ) {}

  // Executando o service
  async execute(request: CreateRankImgRequest) {
    
    // Dados do service
    const { first, second, third } = request;

    try {
      // Criando ...
      const rank = await this.rankImgsRepository.create({
        first,
        second,
        third
      })

      return rank;

    } catch (err) {
      return err;
    }

  }
}