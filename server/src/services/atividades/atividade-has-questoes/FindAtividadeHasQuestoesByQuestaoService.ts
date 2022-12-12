import { AtividadeHasQuestoesRepository } from "../../../repositories/interfaces/atividades/atividade-has-questoes-repository";

// Interface
interface FindAtividadeHasQuestoesByQuestaoRequest {
  id: string;
  id_questao: string;
}

// Service
export class FindAtividadeHasQuestoesByQuestaoService {
  
  // Recebendo o repositório no construtor
  constructor(
    private atividadeHasQuestoesRepository: AtividadeHasQuestoesRepository,
  ) {}

  // Executando o service
  async execute(request: FindAtividadeHasQuestoesByQuestaoRequest) {
    
    // Dados do service
    const { id, id_questao } = request;

    // Buscando ...
    const atividade = await this.atividadeHasQuestoesRepository.findByQuestao({
      id,
      id_questao
    })

    // Se não existir
    if (!atividade) {
      return new Error("Registro inexistente!");
    }

    return atividade;
  }
}