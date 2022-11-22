import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";

// Interface do DeleteEscolas
interface DeleteEscolaUserRequest {
  id: string;
}

// Service
export class DeleteEscolaUserService {
  
  // Recebendo o repositório do usuário no construtor
  constructor(
    private escolaUsersRepository: EscolaUsersRepository,
  ) {}

  // Executando o service
  async execute({ id }: DeleteEscolaUserRequest) {

    // Buscando 
    const escolaUsers = await this.escolaUsersRepository.find({id});

    // Caso não existam EscolaUsers no sistema, retorna erro
    if (!escolaUsers) {
      return new Error("Nenhum usuário cadastrado!")
    } 

    // Se der tudo certo, deleta
    return await this.escolaUsersRepository.delete({id});
  }
}