import { PermissoesRepository } from "../../repositories/interfaces/permissoes/permissoes-repository";

interface UpdatePermissaoRequest {
  id: string;
  description: string;
}

// Service
export class UpdatePermissaoService {

  // Recebendo o repositório da Permissão no construtor
  constructor(
    private permissoesRepository: PermissoesRepository,
  ) {}

  // Executando o service
  async execute(request: UpdatePermissaoRequest) {

    // Dados do service
    const { id, description } = request;

    // Se o usuário não inserir o dado
    if (!description) {
      return new Error("O campo é obrigatório!");
    }

    // Atualizando a permissão
    await this.permissoesRepository.update({
      id,
      description,
    })

    return;
  }
}