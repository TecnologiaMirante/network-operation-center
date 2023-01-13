import { conquistas_difficulty, conquistas_domain, conquistas_type } from "../../repositories/interfaces/conquistas/conquistas-repository";
import { ConquistasRepository } from "../../repositories/interfaces/conquistas/conquistas-repository";

// Para cada tipo de conquista
// Existe um funcionamento diferente

// Service
export class GetConquistasService {
  
  // Recebendo o repositório
  constructor(
    private conquistasRepository: ConquistasRepository,
  ) {}

  // Executando o service
  async execute() {
    
    // Buscando ...
    return await this.conquistasRepository.get()
  }
}