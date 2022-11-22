import { SecretariasRepository } from "../../repositories/interfaces/secretarias/secretarias-repository";

// Interface do updateSecretaria
interface UpdateSecretariaRequest {
  id: string;
  name: string;
}

// Service
export class UpdateSecretariaService {

  // Recebendo o repositório da Secretaria no constructor
  constructor(
    private secretariasRepository: SecretariasRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateSecretariaRequest) {

    // Dados do service
    const { id, name } = request;

    // Se o usuario não inserir nome
    if (!name) {
      return new Error("Por favor, insira algum dado!");
    }

    // Se não existir secretaria
    if (!(await this.secretariasRepository.find({id}))) {
      return new Error("Secretaria inexistente!");
    }

    // Atualizando a secretaria
    await this.secretariasRepository.update({id, name});

    return;
  }
}