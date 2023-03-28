import { QuestoesRepository } from "../../repositories/interfaces/questoes/questoes-repository";

// Interface
interface FindQuestaoRequest {
  id: string;
}

// Service
export class FindQuestaoService {
  
  // Recebendo o repositório
  constructor(
    private questoesRepository: QuestoesRepository,
  ) {}

  // Executando o service
  async execute(request: FindQuestaoRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const questao = await this.questoesRepository.find({
      id,
    })

    // Se não existir questao
    if (!questao) {
      return new Error("Questão inexistente!");
    }

    return questao;
  }
}