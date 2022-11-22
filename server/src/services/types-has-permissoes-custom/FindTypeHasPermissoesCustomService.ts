import { Type_has_permissoesCustomRepository } from "../../repositories/interfaces/permissoes/user-type-has-permissoes-custom-repository";

interface FindTypeHasPermissoesCustomRequest {
  id: string;
}

export class FindTypeHasPermissoesCustomService {

  // Recebendo o repositório no construtor
  constructor(
    private type_has_permissoesCustomRepository: Type_has_permissoesCustomRepository,
  ) {}

  // Executando o service
  async execute({ id }: FindTypeHasPermissoesCustomRequest) {
    
    // Buscando no banco de dados
    const type_has_permissoes = await this.type_has_permissoesCustomRepository.find({id});

    // Caso não existam no sistema, retorna erro
    if (!type_has_permissoes) {
      return new Error("Nada cadastrado!")
    } 

    // Se der tudo certo, retorna as encontradas para o controller
    return type_has_permissoes;
  }
}