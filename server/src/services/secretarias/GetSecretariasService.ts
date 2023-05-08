import { SecretariasRepository } from "../../repositories/interfaces/secretarias/secretarias-repository";

// Service
export class GetSecretariasService {
  
  // Recebendo o repositório da Secretaria no construtor
  constructor(
    private secretariasRepository: SecretariasRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando as secretarias cadastradas
    const secretarias = await this.secretariasRepository.get();

    // Caso não existam secretarias no sistema, retorna erro
    if (Object.keys(secretarias).length == 0) {
      return new Error("Nenhuma secretaria cadastrada!")
    } 

    // Se der tudo certo, retorna as secretarias encontradas
    return secretarias;
  }
}