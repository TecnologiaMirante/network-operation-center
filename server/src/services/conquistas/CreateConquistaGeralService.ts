import { conquistas_difficulty, conquistas_domain, conquistas_type } from "../../repositories/interfaces/conquistas/conquistas-repository";
import { ConquistasRepository } from "../../repositories/interfaces/conquistas/conquistas-repository";

// Interface
interface CreateConquistaGeralRequest {
  name: string;
  description: string;
  color: string;
  icon: string;
  type: conquistas_type;
  domain: conquistas_domain;
  objective: number;
  objective_secondary?: number;
  id_disciplina?: string;
  difficulty: conquistas_difficulty;
}

// Para cada tipo de conquista
// Existe um funcionamento diferente

// Service
export class CreateConquistaGeralService {
  
  // Recebendo o repositório
  constructor(
    private conquistasRepository: ConquistasRepository,
  ) {}

  // Executando o service
  async execute(request: CreateConquistaGeralRequest) {
    
    // Dados do service
    const { name, description, color, icon, type, domain, objective, objective_secondary, id_disciplina, difficulty } = request;

    // Criando ...
    return await this.conquistasRepository.createGeneral({
      name, 
      description,
      color, 
      icon,
      type, 
      domain,
      objective, 
      objective_secondary, 
      id_disciplina, 
      difficulty
    })
  }
}