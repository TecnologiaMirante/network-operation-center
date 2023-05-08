import { EscolaUserHasAddressRepository } from "../../../repositories/interfaces/escolas/escola-user-has-address-repository";

interface FindEscolaUserHasAddressRequest {
    id_user: string;
}

export class FindEscolaUserHasAddressService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private escolaUserHasAddressRepository: EscolaUserHasAddressRepository,
  ) {}

  // Executando o service
  async execute(request: FindEscolaUserHasAddressRequest) {

    // Dados do service
    const { id_user } = request;

    // Verificando se o usuário existe e retornando erro caso não
    const userAddress = await this.escolaUserHasAddressRepository.find({id_user});
    
    if (!userAddress) {
      return new Error ("Endereço de Usuário inexistente!");
    }

    // Retornando o endereço
    return userAddress
  }

}