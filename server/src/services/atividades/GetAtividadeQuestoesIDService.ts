import { AtividadesRepository } from "../../repositories/interfaces/atividades/atividades-repository";

// Interface
interface GetAtividadeQuestoesIDRequest {
  id: string;
}

// Service
export class GetAtividadeQuestoesIDService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
  ) {}

  // Executando o service
  async execute(request: GetAtividadeQuestoesIDRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const atividade = await this.atividadesRepository.getQuestoesID({
      id,
    })

    return atividade;
  }
}