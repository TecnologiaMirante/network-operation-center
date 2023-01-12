import { conquistas_difficulty, conquistas_domain, conquistas_type } from "../../repositories/interfaces/conquistas/conquistas-repository";
import { ConquistasRepository } from "../../repositories/interfaces/conquistas/conquistas-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface
interface CreateConquistaEspecificaRequest {
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
export class CreateConquistaEspecificaService {
  
  // Recebendo o repositório
  constructor(
    private conquistasRepository: ConquistasRepository,
    private disciplinasRepository: DisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: CreateConquistaEspecificaRequest) {
    
    // Dados do service
    const { name, description, color, icon, type, domain, objective, objective_secondary, id_disciplina, difficulty } = request;

    if (!(await this.disciplinasRepository.find({ id: id_disciplina }))) {
      return new Error("Disciplina inexistente!");
    }

    // Criando ...
    return await this.conquistasRepository.createSpecific({
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