import { EscolaUserHasPhonesRepository } from "../../../repositories/interfaces/escolas/escola-user-has-phones-repository";

interface DeleteEscolaUserHasPhonesRequest {
    id: string;
}

export class DeleteEscolaUserHasPhonesService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private escolaUserHasPhonesRepository: EscolaUserHasPhonesRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteEscolaUserHasPhonesRequest) {

    // Dados do service
    const { id } = request;

    // Verificando se o usuário existe e retornando erro caso não
    const userPhones = await this.escolaUserHasPhonesRepository.find({id});
    
    if (!userPhones) {
      return new Error ("Número de Usuário inexistente!");
    }

    // Se der tudo certo, deleta
    return await this.escolaUserHasPhonesRepository.delete({id: Object(userPhones).id});
  }

}