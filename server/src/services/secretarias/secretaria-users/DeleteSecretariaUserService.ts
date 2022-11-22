import { SecretariaUsersRepository } from "../../../repositories/interfaces/secretarias/secretaria-users-repository";

// Interface do deleteSecretariaUsers
interface DeleteSecretariaUserRequest {
  id: string;
}

// Service
export class DeleteSecretariaUserService {

  // Recebendo o repositório da SecretariaUsers no construtor
  constructor(
    private secretariasUsersRepository: SecretariaUsersRepository,
  ) {}

  async execute({ id }: DeleteSecretariaUserRequest) {

    // Buscando o usuario
    const secretariaUser = await this.secretariasUsersRepository.find({id});
    
    // Se não existir usuario
    if (!secretariaUser) {
      return new Error("Usuário inexistente!");
    }

    // Se existir
    return await this.secretariasUsersRepository.delete({id});
  }
}