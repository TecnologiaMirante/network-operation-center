import { Type_has_permissoesRepository } from "../../repositories/interfaces/permissoes/user-type-has-permissoes-repository";

export class GetTypeHasPermissoesService {

  // Recebendo o repositório no construtor
  constructor(
    private type_has_permissoesRepository: Type_has_permissoesRepository,
  ) {}

  // Executando o service
  async execute() {
    
    // Buscando no banco de dados
    const type_has_permissoes = await this.type_has_permissoesRepository.get();

    // Caso não existam no sistema, retorna erro
    if (Object.keys(type_has_permissoes).length == 0) {
      return new Error("Nenhuma secretaria cadastrada!")
    } 

    // Se der tudo certo, retorna as encontradas
    return type_has_permissoes;
  }
}