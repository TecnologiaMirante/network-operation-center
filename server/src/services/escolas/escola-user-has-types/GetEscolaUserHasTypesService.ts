import { EscolaUserHasTypesRepository } from "../../../repositories/interfaces/escolas/escola-user-has-types-repository";

// Service
export class GetEscolaUserHasTypesService {
  
  // Recebendo o repositório da Secretaria no construtor
  constructor(
    private escolaUserHasTypesRepository: EscolaUserHasTypesRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando os dados cadastrados
    const tipos = await this.escolaUserHasTypesRepository.get();

    // Caso não existam dados no sistema, retorna erro
    if (Object.keys(tipos).length == 0) {
      return new Error("Nada cadastrado!")
    } 

    // Se der tudo certo, retorna os dados encontrados
    return tipos;
  }
}