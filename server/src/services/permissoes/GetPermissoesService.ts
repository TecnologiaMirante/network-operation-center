import { PermissoesRepository } from "../../repositories/interfaces/permissoes/permissoes-repository";

// Service
export class GetPermissoesService{

  // Recebendo o repositório da no construtor
  constructor(
    private permissoesRepository: PermissoesRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando as permissões cadastradas
    const permissoes = await this.permissoesRepository.get();

    // Caso não existam permissões cadastradas, retorna erro
    if (Object.keys(permissoes).length == 0) {
      return new Error("Nenhuma permissão cadastrada!")
    }

    // Se der tudo certo, retorna os dados para o controller
    return permissoes;
  }
}