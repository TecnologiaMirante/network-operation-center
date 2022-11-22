import { EscolasRepository } from "../../repositories/interfaces/escolas/escolas-repository";

// Service
export class GetEscolasService {
  
  // Recebendo o repositório da Escola no construtor
  constructor(
    private EscolasRepository: EscolasRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando as Escolas cadastradas
    const escolas = await this.EscolasRepository.get();

    // Caso não existam Escolas no sistema, retorna erro
    if (Object.keys(escolas).length == 0) {
      return new Error("Nenhuma escola cadastrada!")
    } 

    // Se der tudo certo, retorna as Escolas encontradas
    return escolas;
  }
}