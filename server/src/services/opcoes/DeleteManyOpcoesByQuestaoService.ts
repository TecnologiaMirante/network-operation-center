import { OpcoesRepository } from "../../repositories/interfaces/opcoes/opcoes-repository";

// Interface
interface DeleteManyOpcoesByQuestaoRequest {
  id_questao: string;
}

// Service
export class DeleteManyOpcoesByQuestaoService {
  
  // Recebendo o repositório
  constructor(
    private opcoesRepository: OpcoesRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteManyOpcoesByQuestaoRequest) {
    
    // Dados do service 
    const { id_questao } = request;

    return this.opcoesRepository.deleteMany({id_questao});
  }
}