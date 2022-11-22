import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";

// Service
export class GetConteudosService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
  ) {}

  // Executando o service
  async execute() {
    
    // Buscando ...
    const conteudos = await this.conteudosRepository.get();

    // Caso não existam no sistema, retorna erro
    if (Object.keys(conteudos).length == 0) {
      return new Error("Nenhum conteudo cadastrado!")
    } 

    // Retornando os dados para o controller
    return conteudos;
  }
}