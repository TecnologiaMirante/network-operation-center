import { QuestoesRepository } from "../../repositories/interfaces/questoes/questoes-repository";

// Interface
interface DeleteQuestaoRequest {
  id: string;
}

// Service
export class DeleteQuestaoService {
  
  // Recebendo o repositório
  constructor(
    private questoesRepository: QuestoesRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteQuestaoRequest) {
    
    // Dados do service
    const { id } = request;

    // Atualizando ...
    const questao = await this.questoesRepository.find({
      id,
    })

    // Se não existir questao
    if (!questao) {
      return new Error("Questão inexistente!");
    }

    return this.questoesRepository.delete({id});
  }
}