import { conquistas_difficulty, conquistas_domain, conquistas_type } from "../../repositories/interfaces/conquistas/conquistas-repository";
import { ConquistasRepository } from "../../repositories/interfaces/conquistas/conquistas-repository";

// Interface
interface CreateConquistasRequest {
  name: string;
  description: string;
  type: conquistas_type;
  domain: conquistas_domain;
  objective: number;
  objective_secondary?: number;
  id_disciplina: string;
  difficulty: conquistas_difficulty;
}

// Para cada tipo de conquista
// Existe um funcionamento diferente

// Service
export class CreateConquistasService {
  
  // Recebendo o repositório
  constructor(
    private conquistasRepository: ConquistasRepository,
  ) {}

  // Executando o service
  async execute(request: CreateConquistasRequest) {
    
    // Dados do service
    const { name, description, type, domain, objective, objective_secondary, id_disciplina, difficulty } = request;

    // Criando ...
    return await this.conquistasRepository.get();
  }
}