import { AtividadesRepository } from "../../repositories/interfaces/atividades/atividades-repository";

// Interface
interface GetAtividadeIdDisciplinaRequest {
  id: string;
}

// Service
export class GetAtividadeIdDisciplinaService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
  ) {}

  // Executando o service
  async execute(request: GetAtividadeIdDisciplinaRequest) {
    
    // Dados do service
    const { id } = request;

    try {
      // Buscando ...
      const atividade = await this.atividadesRepository.getIdDisciplina({
        id,
      })

      return atividade;
    } catch (err) {
      return new Error("Erro durante a busca do id!");
    }
  }
}