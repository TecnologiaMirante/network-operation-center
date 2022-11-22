import { PermissoesRepository } from "../../repositories/interfaces/permissoes/permissoes-repository";

interface CreatePermissaoRequest {
  description: string;
}

// Service
export class CreatePermissaoService {

  // Recebendo o repositório da Permissão no construtor
  constructor(
    private permissoesRepository: PermissoesRepository,
  ) {}

  // Executando o service
  async execute(request: CreatePermissaoRequest) {

    // Dados do service
    const { description } = request;

    // Se o usuário não inserir o dado
    if (!description) {
      return new Error("O campo é obrigatório!");
    }

    // Criando a permissão
    await this.permissoesRepository.create({
      description,
    })
  }
}