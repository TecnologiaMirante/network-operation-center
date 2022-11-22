import { ResponsaveisRepository } from "../../repositories/interfaces/responsaveis/responsaveis-repository";

export class GetResponsaveisService {

  // Recebendo o repositório no construtor
  constructor(
    private responsaveisRepository: ResponsaveisRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando
    const resps = await this.responsaveisRepository.get();

    // Caso não existam responsáveis no sistema, retorna erro
    if (Object.keys(resps).length == 0) {
      return new Error("Nenhum responśavel cadastrado!")
    } 

  // Se der tudo certo, retorna os dados encontrados
    return resps;
  }
}