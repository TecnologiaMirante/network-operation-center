import { SecretariaUsersRepository } from "../../../repositories/interfaces/secretarias/secretaria-users-repository";

// Interface do Findecretarias
interface FindSecretariaUserLoginDataRequest {
  id: string;
}

// Service
export class FindSecretariaUsersLoginDataService {
  
  // Recebendo o repositório do usuário no construtor
  constructor(
    private SecretariaUsersRepository: SecretariaUsersRepository,
  ) {}

  // Executando o service
  async execute({ id }: FindSecretariaUserLoginDataRequest) {
    // Buscando 
    const secretariaUsers = await this.SecretariaUsersRepository.findLoginData({id});

    // Caso não existam secretariaUsers no sistema, retorna erro
    if (!secretariaUsers) {
      return new Error("Nenhum usuário cadastrado!")
    } 

    // Se der tudo certo, retorna os dados encontrados
    return secretariaUsers;
  }
}