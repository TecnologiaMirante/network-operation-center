import { SecretariasRepository } from "../../repositories/interfaces/secretarias/secretarias-repository";

// Interface do deleteSecretaria
interface DeleteSecretariaRequest {
  id: string;
}

// Service
export class DeleteSecretariaService {

  // Recebendo o repositório da Secretaria no construtor
  constructor(
    private secretariasRepository: SecretariasRepository,
  ) {}

  async execute({ id }: DeleteSecretariaRequest) {

    // Buscando a secretaria
    const secretaria = await this.secretariasRepository.find({id});
    // Se não existir secretaria
    if (!secretaria) {
      return new Error("Secretaria inexistente!");
    }

    // Se existir
    return await this.secretariasRepository.delete({id});
  }
}