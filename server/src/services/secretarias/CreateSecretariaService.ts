import { SecretariasRepository } from "../../repositories/interfaces/secretarias/secretarias-repository";

// Interface do createSecretaria
interface CreateSecretariaRequest {
  name: string;
}

// Service
export class CreateSecretariaService {
  
  // Recebendo o repositório da Secretaria no construtor
  constructor(
    private secretariasRepository: SecretariasRepository,
  ) {}

  // Executando o service
  async execute(request: CreateSecretariaRequest) {
    
    // Dados do service
    const { name } = request;

    // Se o usuário não inserir nome
    if (!name) {
      return new Error("O campo nome é obrigatório!");
    }

    // Criando a secretaria ...
    return await this.secretariasRepository.create({
      name,
    })
  }
}