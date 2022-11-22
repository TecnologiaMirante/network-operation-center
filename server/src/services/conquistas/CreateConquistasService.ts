import { conquistas_difficulty, conquistas_type } from "../../repositories/interfaces/conquistas/conquistas-repository";
import { ConquistasRepository } from "../../repositories/interfaces/conquistas/conquistas-repository";

// Interface
interface CreateConquistasRequest {
  name: string;
  description: string;
  type: conquistas_type;
  objective: string;
  objective_secondary?: string;
  discipline: string;
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
    const { name, description, type, objective, objective_secondary, discipline, difficulty } = request;

    // Criando ...
    return await this.conquistasRepository.create({
      name, 
      description,
      type, 
      objective, 
      objective_secondary, 
      discipline, 
      difficulty
    })
  }
}