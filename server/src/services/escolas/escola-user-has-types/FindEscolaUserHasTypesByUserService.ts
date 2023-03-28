import { EscolaUserHasTypesRepository } from "../../../repositories/interfaces/escolas/escola-user-has-types-repository";

interface FindEscolaUserHasTypesRequest {
  id_user: string;
}

// Service
export class FindEscolaUserHasTypesByUserService {
  
  // Recebendo o repositório da Secretaria no construtor
  constructor(
    private escolaUserHasTypesRepository: EscolaUserHasTypesRepository,
  ) {}

  // Executando o service
  async execute({ id_user }: FindEscolaUserHasTypesRequest) {

    // Buscando os dados cadastrados
    const UserHasType = await this.escolaUserHasTypesRepository.findByUser({id_escola_user:id_user});

    // Caso não existam dados no sistema, retorna erro
    if (!UserHasType) {
      return new Error("Nada cadastrado!")
    } 

    // Se der tudo certo, retorna os dados encontrados
    return UserHasType;
  }
}