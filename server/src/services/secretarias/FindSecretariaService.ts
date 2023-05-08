import { SecretariasRepository } from "../../repositories/interfaces/secretarias/secretarias-repository";

// Interface do findSecretaria
interface FindSecretariaServiceRequest {
  id: string;
}

// Service
export class FindSecretariaService {
  
  // Recebendo o repositório da Secretaria no construtor
  constructor(
    private secretariasRepository: SecretariasRepository,
  ) {}

  // Executando o service
  async execute({ id }: FindSecretariaServiceRequest) {
    
    // Buscando a secretaria
    const secretaria = await this.secretariasRepository.find({id});

    // Se não existir secretaria
    if (!secretaria) {
      return new Error("Secretaria inexistente!");
    }

    // Retornando a secretaria encontrada ...
    return secretaria;
  }
}