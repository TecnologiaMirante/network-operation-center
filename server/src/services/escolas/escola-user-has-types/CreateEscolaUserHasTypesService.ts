import { EscolaUserHasTypesRepository } from "../../../repositories/interfaces/escolas/escola-user-has-types-repository";
import { EscolaUserTypesRepository } from "../../../repositories/interfaces/escolas/escolas-user-types-repository";
import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";

interface CreateEscolaUserHasTypesRequest {
  id_escola_user: string;
  id_type: string;
}

export class CreateEscolaUserHasTypeService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private escolaUserHasTypesRepository: EscolaUserHasTypesRepository,
    private escolaUserTypesRepository: EscolaUserTypesRepository,
    private escolaUsersRepository: EscolaUsersRepository
  ) {}

  // Executando o service
  async execute(request: CreateEscolaUserHasTypesRequest) {

    // Dados do service
    const { id_escola_user, id_type } = request;

    // Se o usuário não inserir os dados obrigatórios
    if (!id_escola_user && !id_type) {
      return new Error(`Por favor, preencha todos os campos obrigatórios!`);
    }

    // Verificando se o tipo existe e retornando erro caso não
    if (!(await this.escolaUserTypesRepository.find({id: id_type}))) {
      return new Error ("Tipo inexistente!");
    }

    // Verificando se o usuário existe e retornando erro caso não
    if (!(await this.escolaUsersRepository.find({id: id_escola_user}))) {
      return new Error ("Usuário inexistente!");
    }

    // Criando a EscolaUserType
    await this.escolaUserHasTypesRepository.create({
      id_escola_user, 
      id_type
    });
  }

}