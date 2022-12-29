import { AtividadesRepository } from "../../repositories/interfaces/atividades/atividades-repository";

// Interface
interface FindAtividadeWebViewRequest {
  id: string;
}

// Service
export class FindAtividadeWebViewService {
  
  // Recebendo o repositório no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
  ) {}

  // Executando o service
  async execute(request: FindAtividadeWebViewRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const atividade = await this.atividadesRepository.findWebView({
      id
    })

    return atividade;
  }
}