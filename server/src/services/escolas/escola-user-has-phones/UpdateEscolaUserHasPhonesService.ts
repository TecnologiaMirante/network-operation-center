import { EscolaUserHasPhonesRepository } from "../../../repositories/interfaces/escolas/escola-user-has-phones-repository";
import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";

interface UpdateEscolaUserHasPhoneRequest {
    id: string;
    phone?: string;
    id_user?: string;
}

export class UpdateEscolaUserHasPhonesService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private escolaUserHasPhoneRepository: EscolaUserHasPhonesRepository,
    private escolaUsersRepository: EscolaUsersRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateEscolaUserHasPhoneRequest) {

    // Dados do service
    const { id, phone, id_user } = request;

    // Verificando se o usuário existe e retornando erro caso não
    if (!(await this.escolaUserHasPhoneRepository.find({id}))) {
      return new Error ("Registro inexistente!");
    }

    if (id_user) {
      // Verificando se o usuário existe e retornando erro caso não
      if (!(await this.escolaUsersRepository.find({id:id_user}))) {
        return new Error ("Usuário inexistente!");
      }
    }

    // Atualizanod a EscolaUserType
    await this.escolaUserHasPhoneRepository.update({
        id,
        phone,
        id_user
    });
  }

}