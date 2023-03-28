import { AtividadeHasQuestoesRepository } from "../../../repositories/interfaces/atividades/atividade-has-questoes-repository";

// Service
export class GetAtividadeHasQuestoesService {
  
  // Recebendo o repositório no construtor
  constructor(
    private atividadeHasQuestoesRepository: AtividadeHasQuestoesRepository,
  ) {}

  // Executando o service
  async execute() {
    
    // Buscando ...
    const atividades = await this.atividadeHasQuestoesRepository.get()

    // Caso não existam no sistema, retorna erro
    if (Object.keys(atividades).length == 0) {
      return new Error("Nenhum registro existente!")
    } 

    return atividades;
  }
}