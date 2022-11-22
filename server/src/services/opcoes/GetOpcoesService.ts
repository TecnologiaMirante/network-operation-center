import { OpcoesRepository } from "../../repositories/interfaces/opcoes/opcoes-repository";

// Service
export class GetOpcoesService {
  
  // Recebendo o repositório
  constructor(
    private opcoesRepository: OpcoesRepository,
  ) {}

  // Executando o service
  async execute() {
    
    // Buscando ...
    const opcoes = await this.opcoesRepository.get()

    // Caso não existam opcoes no sistema, retorna erro
    if (Object.keys(opcoes).length == 0) {
      return new Error("Nenhuma opção cadastrada!")
    } 

    // Se der tudo certo, retorna os dados encontrads
    return opcoes;
  }
}