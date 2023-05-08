import { OpcoesRepository } from "../../repositories/interfaces/opcoes/opcoes-repository";
import { QuestoesRepository } from "../../repositories/interfaces/questoes/questoes-repository";

// Interface
interface UpdateOpcaoRequest {
  id: string;
  alt?: string;
  description?: string;
  is_correct?: boolean;
  id_questao?: string;
}

// Service
export class UpdateOpcaoService {
  
  // Recebendo o repositório
  constructor(
    private opcoesRepository: OpcoesRepository,
    private questoesRepository: QuestoesRepository
  ) {}

  // Executando o service
  async execute(request: UpdateOpcaoRequest) {
    
    // Dados do service 
    const { id, description, is_correct, id_questao } = request;

    if (id_questao) {
      // Verificando se a questão existir
      if(!(await this.questoesRepository.find({id: id_questao}))){
        // Se a questão não existir
        return new Error("Questão inexistente!");
      }
    }

    // Criando ...
    await this.opcoesRepository.update({
      id,
      description,
      is_correct,
      id_questao
    })
  }
}