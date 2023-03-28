import { EscolaUserHasAddressRepository } from "../../../repositories/interfaces/escolas/escola-user-has-address-repository";
import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";

interface CreateEscolaUserHasAddressRequest {
    state?: string;
    city?: string;
    district?: string;
    number?: string;
    street?: string;
    address_continued?: string;
    zip_code?: string;
    reference?: string;
    id_user: string;
}

export class CreateEscolaUserHasAddressService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private escolaUserHasAddressRepository: EscolaUserHasAddressRepository,
    private escolaUsersRepository: EscolaUsersRepository,
  ) {}

  // Executando o service
  async execute(request: CreateEscolaUserHasAddressRequest) {

    // Dados do service
    const { state, city, district, number, street, address_continued, zip_code, reference, id_user } = request;

    // Verificando se o usuário existe e retornando erro caso não
    if (!(await this.escolaUsersRepository.find({id:id_user}))) {
      return new Error ("Usuário inexistente!");
    }

    // Criando a EscolaUserType
    await this.escolaUserHasAddressRepository.create({
        state, 
        city, 
        district, 
        number, 
        street, 
        address_continued, 
        zip_code, 
        reference, 
        id_user
    });

  }

}