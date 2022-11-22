import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";

// Service
export class GetAulasService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private aulasRepository: AulasRepository,
  ) {}

  // Executando o service
  async execute() {
    
    // Buscando ...
    const aulas = await this.aulasRepository.get();

    if (Object.keys(aulas).length == 0) {
      return new Error("Nenhuma aula cadastrada!")
    }

    return aulas;
  }
}