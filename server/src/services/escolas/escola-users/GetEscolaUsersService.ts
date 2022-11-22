import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";


// Service
export class GetEscolaUsersService {
  
  // Recebendo o repositório do usuário no construtor
  constructor(
    private escolaUsersRepository: EscolaUsersRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando as EscolaUsers cadastradas
    const escolaUsers = await this.escolaUsersRepository.get();

    // Caso não existam EscolaUsers no sistema, retorna erro
    if (Object.keys(escolaUsers).length == 0) {
      return new Error("Nenhum usuário cadastrado!")
    } 

    // Se der tudo certo, retorna os dados encontrados
    return escolaUsers;
  }
}