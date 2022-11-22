import { QuestoesRepository } from "../../repositories/interfaces/questoes/questoes-repository";

// Service
export class GetQuestoesService {
  
  // Recebendo o repositório
  constructor(
    private questoesRepository: QuestoesRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando ...
    const questoes = await this.questoesRepository.get()

    // Caso não existam questões no sistema, retorna erro
    if (Object.keys(questoes).length == 0) {
      return new Error("Nenhuma questão cadastrada!")
    } 

    // Se der tudo certo, retorna as questões encontradas
    return questoes;
  }
}