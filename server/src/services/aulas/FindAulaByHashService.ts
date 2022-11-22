import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";

// Interface
interface FindAulaByHashRequest {
  hash: string;
}

// Service
export class FindAulaByHashService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private aulasRepository: AulasRepository,
  ) {}

  // Executando o service
  async execute(request: FindAulaByHashRequest) {
    
    // Dados do service
    const { hash } = request;

    try {
      // Buscando ...
      const aula = await this.aulasRepository.findByhash({
        hash, 
      })

      return aula;

    } catch (err) {
      return new Error("Erro durante a busca da aula!");
    }
  }
}