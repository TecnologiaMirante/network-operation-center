import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { RanksRepository } from "../../repositories/interfaces/ranks/ranks-repository";

// Service
export class GetRankService {
  
  // Recebendo o repositório da Rank no construtor
  constructor(
    private ranksRepository: RanksRepository,
  ) {}

  // Executando o service
  async execute() {
    
    try {
      const rank = await this.ranksRepository.get();

     // Caso não existam no sistema, retorna erro
     if (Object.keys(rank).length == 0) {
        return new Error("Nenhum aluno cadastrado no rank!")
     } 

     return rank;
    } catch (err) {
      return err;
    }
  }
}