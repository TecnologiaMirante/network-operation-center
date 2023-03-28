import { EscolaUserHasTypesRepository } from "../../../repositories/interfaces/escolas/escola-user-has-types-repository";

interface DeleteEscolaUserHasTypesRequest {
  id: string;
}

// Service
export class DeleteEscolaUserHasTypesService {
  
  // Recebendo o repositório no construtor
  constructor(
    private escolaUserHasTypesRepository: EscolaUserHasTypesRepository,
  ) {}

  // Executando o service
  async execute({ id }: DeleteEscolaUserHasTypesRequest) {

    // Buscando os dados cadastrados
    const UserHasType = await this.escolaUserHasTypesRepository.find({id});

    // Caso não existam dados no sistema, retorna erro
    if (!UserHasType) {
      return new Error("Nada cadastrado!")
    } 

    // Se der tudo certo, deleta
    return await this.escolaUserHasTypesRepository.delete({id});
  }
}