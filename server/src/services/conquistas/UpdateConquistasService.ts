import { conquistas_difficulty, conquistas_domain, conquistas_type } from "../../repositories/interfaces/conquistas/conquistas-repository";
import { ConquistasRepository } from "../../repositories/interfaces/conquistas/conquistas-repository";

// Interface
interface UpdateConquistasRequest {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
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
export class UpdateConquistasService {
  
  // Recebendo o repositório
  constructor(
    private conquistasRepository: ConquistasRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateConquistasRequest) {
    
    // Dados do service
    const { id, name, description, color, icon, type, domain, objective, objective_secondary, id_disciplina, difficulty } = request;

    // Criando ...
    const conquista = await this.conquistasRepository.update({
      id,
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

    if (conquista instanceof Error) {
      return new Error("Erro ao atualizar a conquista!");
    }

    return conquista;
  }
}