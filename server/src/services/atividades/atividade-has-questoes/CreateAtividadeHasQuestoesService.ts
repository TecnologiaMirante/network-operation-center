import { AtividadesRepository } from "../../../repositories/interfaces/atividades/atividades-repository";
import { QuestoesRepository } from "../../../repositories/interfaces/questoes/questoes-repository";
import { AtividadeHasQuestoesRepository } from "../../../repositories/interfaces/atividades/atividade-has-questoes-repository";

// Interface
interface CreateAtividadeHasQuestoesRequest {
  id_questao: string;
  id_atividade: string;
}

// Service
export class CreateAtividadeHasQuestoesService {
  
  // Recebendo o repositório no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
    private questoesRepository: QuestoesRepository,
    private atividadeHasQuestoesRepository: AtividadeHasQuestoesRepository,
  ) {}

  // Executando o service
  async execute(request: CreateAtividadeHasQuestoesRequest) {
    
    // Dados do service
    const { id_questao, id_atividade } = request;

    // Verificando se a atividade existe
    if(!(await this.atividadesRepository.find({id: id_atividade}))) {
      return new Error("Atividade inexistente!")
    }
    
    // Verificando se a questão existe
    if(!(await this.questoesRepository.find({id: id_questao}))) {
      return new Error("Questão inexistente!")
    }
    
    // Criando ...
    const atividade = await this.atividadeHasQuestoesRepository.create({
      id_questao,
      id_atividade
    })
    
    // Atualizando o valor das questões
    await this.atividadeHasQuestoesRepository.updateQuestoesGrade({ id_atividade });

    // return atividade;
  }
}