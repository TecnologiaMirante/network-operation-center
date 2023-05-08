import { AtividadeHasQuestoesRepository } from "../../../repositories/interfaces/atividades/atividade-has-questoes-repository";
import { AtividadesRepository } from "../../../repositories/interfaces/atividades/atividades-repository";

// Interface
interface DeleteManyAtividadeHasQuestoesByAtividadeRequest {
  id_atividade: string;
}

// Service
export class DeleteManyAtividadeHasQuestoesByAtividadeService {
  
  // Recebendo o repositório no construtor
  constructor(
    private atividadeHasQuestoesRepository: AtividadeHasQuestoesRepository,
    private atividadesRepository: AtividadesRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteManyAtividadeHasQuestoesByAtividadeRequest) {
    
    // Dados do service
    const { id_atividade } = request;

    // Verificando se a atividade existe ...
    try {
      if (!(await this.atividadesRepository.find({ id: id_atividade }))) {
        return new Error("Registro inexistente!");
      }

    } catch (err) {
      return err;
    }

    // Apagando os relacionamentos entre essa atividade e as questões
    return this.atividadeHasQuestoesRepository.deleteManyByAtividade({ id_atividade });
  }
}