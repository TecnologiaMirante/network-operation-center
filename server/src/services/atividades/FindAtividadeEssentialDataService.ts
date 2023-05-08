import { AtividadesRepository } from "../../repositories/interfaces/atividades/atividades-repository";

// Interface
interface FindAtividadeEssentialDataRequest {
  id: string;
}

// Service
export class FindAtividadeEssentialDataService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
  ) {}

  // Executando o service
  async execute(request: FindAtividadeEssentialDataRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const atividade = await this.atividadesRepository.findEssentialData({
      id,
      
    })

    return atividade;
  }
}