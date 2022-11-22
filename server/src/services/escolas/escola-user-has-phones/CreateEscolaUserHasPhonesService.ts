import { EscolaUserHasPhonesRepository } from "../../../repositories/interfaces/escolas/escola-user-has-phones-repository";
import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";

interface CreateEscolaUserHasPhonesRequest {
    phone?: string;
    id_user: string;
}

export class CreateEscolaUserHasPhonesService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private escolaUserHasPhonesRepository: EscolaUserHasPhonesRepository,
    private escolaUsersRepository: EscolaUsersRepository,
  ) {}

  // Executando o service
  async execute(request: CreateEscolaUserHasPhonesRequest) {

    // Dados do service
    const { phone, id_user } = request;

    // Verificando se o usuário existe e retornando erro caso não
    if (!(await this.escolaUsersRepository.find({id:id_user}))) {
      return new Error ("Usuário inexistente!");
    }

    // Criando a EscolaUserPhone
    await this.escolaUserHasPhonesRepository.create({
        phone,
        id_user
    });

  }

}