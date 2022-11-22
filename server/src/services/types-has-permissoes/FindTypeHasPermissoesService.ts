import { Type_has_permissoesRepository } from "../../repositories/interfaces/permissoes/user-type-has-permissoes-repository";

interface FindTypeHasPermissoesRequest {
  id: string;
}

export class FindTypeHasPermissoesService {

  // Recebendo o repositório no construtor
  constructor(
    private type_has_permissoesRepository: Type_has_permissoesRepository,
  ) {}

  // Executando o service
  async execute({ id }: FindTypeHasPermissoesRequest) {
    
    // Buscando no banco de dados
    const type_has_permissoes = await this.type_has_permissoesRepository.find({id});

    // Caso não existam no sistema, retorna erro
    if (!type_has_permissoes) {
      return new Error("Nada cadastrado!")
    } 

    // Se der tudo certo, retorna as encontradas para o controller
    return type_has_permissoes;
  }
}