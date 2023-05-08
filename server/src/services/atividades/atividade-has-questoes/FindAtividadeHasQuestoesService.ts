import { AtividadeHasQuestoesRepository } from "../../../repositories/interfaces/atividades/atividade-has-questoes-repository";

// Interface
interface FindAtividadeHasQuestoesRequest {
  id: string;
}

// Service
export class FindAtividadeHasQuestoesService {
  
  // Recebendo o repositório no construtor
  constructor(
    private atividadeHasQuestoesRepository: AtividadeHasQuestoesRepository,
  ) {}

  // Executando o service
  async execute(request: FindAtividadeHasQuestoesRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const atividade = await this.atividadeHasQuestoesRepository.find({
      id,
    })

    // Se não existir
    if (!atividade) {
      return new Error("Registro inexistente!");
    }

    return atividade;
  }
}