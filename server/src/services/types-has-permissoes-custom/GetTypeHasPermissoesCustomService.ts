import { Type_has_permissoesCustomRepository } from "../../repositories/interfaces/permissoes/user-type-has-permissoes-custom-repository";

export class GetTypeHasPermissoesCustomService {

  // Recebendo o repositório no construtor
  constructor(
    private type_has_permissoesCustomRepository: Type_has_permissoesCustomRepository,
  ) {}

  // Executando o service
  async execute() {
    
    // Buscando no banco de dados
    const type_has_permissoes = await this.type_has_permissoesCustomRepository.get();

    // Caso não existam no sistema, retorna erro
    if (Object.keys(type_has_permissoes).length == 0) {
      return new Error("Nada cadastrado!")
    } 

    // Se der tudo certo, retorna as encontradas
    return type_has_permissoes;
  }
}