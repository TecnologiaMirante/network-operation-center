import { EscolaUserHasAddressRepository } from "../../../repositories/interfaces/escolas/escola-user-has-address-repository";

interface UpdateEscolaUserHasAddressRequest {
    id: string;
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

export class UpdateEscolaUserHasAddressService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private escolaUserHasAddressRepository: EscolaUserHasAddressRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateEscolaUserHasAddressRequest) {

    // Dados do service
    const { id, state, city, district, number, street, address_continued, zip_code, reference, id_user } = request;

    // Verificando se o usuário existe e retornando erro caso não
    if (!(await this.escolaUserHasAddressRepository.find({id_user}))) {
      return new Error ("Usuário inexistente!");
    }

    // Atualizanod a EscolaUserType
    await this.escolaUserHasAddressRepository.update({
        id,
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