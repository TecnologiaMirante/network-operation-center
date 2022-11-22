import { EscolaUserHasAddressRepository } from "../../../repositories/interfaces/escolas/escola-user-has-address-repository";

interface DeleteEscolaUserHasAddressRequest {
    id_user: string;
}

export class DeleteEscolaUserHasAddressService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private escolaUserHasAddressRepository: EscolaUserHasAddressRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteEscolaUserHasAddressRequest) {

    // Dados do service
    const { id_user } = request;

    // Verificando se o usuário existe e retornando erro caso não
    const userAddress = await this.escolaUserHasAddressRepository.find({id_user});
    
    if (!userAddress) {
      return new Error ("Endereço de Usuário inexistente!");
    }

    // Se der tudo certo, deleta
    return await this.escolaUserHasAddressRepository.delete({id: Object(userAddress).id});
  }

}