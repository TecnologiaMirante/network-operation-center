import { AtividadesRepository } from "../../../repositories/interfaces/atividades/atividades-repository";
import { QuestoesRepository } from "../../../repositories/interfaces/questoes/questoes-repository";
import { AtividadeHasQuestoesRepository } from "../../../repositories/interfaces/atividades/atividade-has-questoes-repository";

// Interface
interface UpdateAtividadeHasQuestoesRequest {
  id: string;
  id_questao?: string;
  id_atividade?: string;
}

// Service
export class UpdateAtividadeHasQuestoesService {
  
  // Recebendo o repositório no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
    private questoesRepository: QuestoesRepository,
    private atividadeHasQuestoesRepository: AtividadeHasQuestoesRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateAtividadeHasQuestoesRequest) {
    
    // Dados do service
    const { id, id_questao, id_atividade } = request;

    // Se não existir
    if (!(await this.atividadeHasQuestoesRepository.find({id}))) {
      return new Error("Registro inexistente!");
    }

    if (id_atividade) {
      // Verificando se a atividade existe
      if(!(await this.atividadesRepository.find({id: id_atividade}))) {
        return new Error("Atividade inexistente!")
      }
    }
    
    if (id_questao) {
      // Verificando se a questão existe
      if(!(await this.questoesRepository.find({id: id_questao}))) {
        return new Error("Questão inexistente!")
      }
    }

    // Criando ...
    const atividade = await this.atividadeHasQuestoesRepository.update({
      id,
      id_questao,
      id_atividade
    })

    return atividade;
  }
}