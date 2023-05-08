import { SecretariaUsersRepository } from "../../../repositories/interfaces/secretarias/secretaria-users-repository";


// Service
export class GetSecretariaUsersService {
  
  // Recebendo o repositório da Secretaria no construtor
  constructor(
    private secretariaUsersRepository: SecretariaUsersRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando os usuarios cadastradas
    const secretariaUsers = await this.secretariaUsersRepository.get();

    // Caso não existam usuarios no sistema, retorna erro
    if (Object.keys(secretariaUsers).length == 0) {
      return new Error("Nenhum usuário cadastrado!")
    } 

    // Se der tudo certo, retorna as secretarias encontradas
    return secretariaUsers;
  }
}