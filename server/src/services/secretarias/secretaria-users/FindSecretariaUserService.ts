import { SecretariaUsersRepository } from "../../../repositories/interfaces/secretarias/secretaria-users-repository";

// Interface do FindSecretariaUsers
interface FindSecretariaUserRequest {
  id: string;
}

// Service
export class FindSecretariaUserService {

  // Recebendo o repositório da SecretariaUsers no construtor
  constructor(
    private secretariasUsersRepository: SecretariaUsersRepository,
  ) {}

  async execute({ id }: FindSecretariaUserRequest) {

    // Buscando o usuario
    const secretariaUser = await this.secretariasUsersRepository.find({id});
    
    // Se não existir usuario
    if (!secretariaUser) {
      return new Error("Usuário inexistente!");
    }

    // Se existir, retorna para o controller
    return secretariaUser;
  }
}