import { OpcoesRepository } from "../../repositories/interfaces/opcoes/opcoes-repository";
import { QuestoesRepository } from "../../repositories/interfaces/questoes/questoes-repository";

// Interface
interface CreateOpcaoRequest {
  description: string;
  is_correct: boolean;
  id_questao: string;
}

// Service
export class CreateOpcaoService {
  
  // Recebendo o repositório
  constructor(
    private opcoesRepository: OpcoesRepository,
    private questoesRepository: QuestoesRepository
  ) {}

  // Executando o service
  async execute(request: CreateOpcaoRequest) {
    
    // Dados do service 
    const { description, is_correct, id_questao } = request;

    // Verificando se a questão existir
    if(!(await this.questoesRepository.find({id: id_questao}))){
      // Se a questão não existir
      return new Error("Questão inexistente!");
    }

    // Criando ...
    await this.opcoesRepository.create({
      description,
      is_correct,
      id_questao
    })
  }
}