import { EscolaUserHasPhonesRepository } from "../../../repositories/interfaces/escolas/escola-user-has-phones-repository";

interface FindEscolaUserHasPhonesRequest {
    id_user: string;
}

export class FindEscolaUserHasPhonesService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private escolaUserHasPhonesRepository: EscolaUserHasPhonesRepository,
  ) {}

  // Executando o service
  async execute(request: FindEscolaUserHasPhonesRequest) {

    // Dados do service
    const { id_user } = request;

    // Verificando se o usuário existe e retornando erro caso não
    const userAddress = await this.escolaUserHasPhonesRepository.get();
    
    if (!userAddress) {
      return new Error ("Endereço de Usuário inexistente!");
    }

    // Retornando o endereço
    return userAddress
  }

}