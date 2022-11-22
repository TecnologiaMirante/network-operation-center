import { EscolaUserTypesRepository } from "../../../repositories/interfaces/escolas/escolas-user-types-repository";

// Service
export class GetEscolaUserTypesService {
  
  // Recebendo o repositório da Secretaria no construtor
  constructor(
    private escolaUserTypeRepository: EscolaUserTypesRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando os tipos cadastradas
    const tipos = await this.escolaUserTypeRepository.get();

    // Caso não existam tipos no sistema, retorna erro
    if (Object.keys(tipos).length == 0) {
      return new Error("Nenhum tipo cadastrado!")
    } 

    // Se der tudo certo, retorna os tipos encontrados
    return tipos;
  }
}