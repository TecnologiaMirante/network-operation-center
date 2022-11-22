import { AtividadesRepository } from "../../repositories/interfaces/atividades/atividades-repository";

// Interface
interface FindAtividadeRequest {
  id: string;
}

// Service
export class FindAtividadeService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
  ) {}

  // Executando o service
  async execute(request: FindAtividadeRequest) {
    
    // Dados do service
    const { id,  } = request;

    // Buscando ...
    const atividade = await this.atividadesRepository.find({
      id,
      
    })

    return atividade;
  }
}