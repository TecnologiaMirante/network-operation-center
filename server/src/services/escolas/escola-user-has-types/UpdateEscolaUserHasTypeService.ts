import { EscolaUserHasTypesRepository } from "../../../repositories/interfaces/escolas/escola-user-has-types-repository";
import { EscolaUserTypesRepository } from "../../../repositories/interfaces/escolas/escolas-user-types-repository";
import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";

interface UpdateEscolaUserHasTypesRequest {
  id: string;
  id_escola_user?: string;
  id_type?: string;
}

export class UpdateEscolaUserHasTypeService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private escolaUserHasTypesRepository: EscolaUserHasTypesRepository,
    private escolaUserTypesRepository: EscolaUserTypesRepository,
    private escolaUsersRepository: EscolaUsersRepository
  ) {}

  // Executando o service
  async execute(request: UpdateEscolaUserHasTypesRequest) {

    // Dados do service
    const { id, id_escola_user, id_type } = request;

    // Verificando se o tipo existe e retornando erro caso não
    if (id_type) {
      if (!(await this.escolaUserTypesRepository.find({id: id_type}))) {
        return new Error ("Tipo inexistente!");
      }
    }

    if (id_escola_user) {
      // Verificando se o usuário existe e retornando erro caso não
      if (!(await this.escolaUsersRepository.find({id: id_escola_user}))) {
        return new Error ("Usuário inexistente!");
      }
    }

    // Atualizando
    await this.escolaUserHasTypesRepository.update({
      id,
      id_escola_user, 
      id_type
    });
  }

}