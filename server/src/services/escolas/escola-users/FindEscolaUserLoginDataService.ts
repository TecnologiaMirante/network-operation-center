import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";

// Interface do FindEscolas
interface FindEscolaUserLoginDataRequest {
  id: string;
}

// Service
export class FindEscolaUsersLoginDataService {
  
  // Recebendo o repositório do usuário no construtor
  constructor(
    private escolaUsersRepository: EscolaUsersRepository,
  ) {}

  // Executando o service
  async execute({ id }: FindEscolaUserLoginDataRequest) {

    // Buscando 
    const escolaUsers = await this.escolaUsersRepository.findAlunoLoginData({id});

    // Caso não existam EscolaUsers no sistema, retorna erro
    if (!escolaUsers) {
      return new Error("Nenhum usuário cadastrado!")
    } 

    // Se der tudo certo, retorna os dados encontrados
    return escolaUsers;
  }
}