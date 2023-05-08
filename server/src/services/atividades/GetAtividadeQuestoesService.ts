import { AtividadesRepository } from "../../repositories/interfaces/atividades/atividades-repository";

// Interface
interface GetAtividadeQuestoesRequest {
  id: string;
}

// Service
export class GetAtividadeQuestoesService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
  ) {}

  // Executando o service
  async execute(request: GetAtividadeQuestoesRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const atividade = await this.atividadesRepository.getQuestoes({
      id,
    })

    return atividade;
  }
}