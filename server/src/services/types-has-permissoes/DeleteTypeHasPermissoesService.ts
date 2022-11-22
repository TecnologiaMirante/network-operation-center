import { Type_has_permissoesRepository } from "../../repositories/interfaces/permissoes/user-type-has-permissoes-repository";

interface DeleteTypeHasPermissoesRequest {
  id: string;
}

export class DeleteTypeHasPermissoesService {

  // Recebendo o repositório no construtor
  constructor(
    private type_has_permissoesRepository: Type_has_permissoesRepository,
  ) {}

  // Executando o service
  async execute({ id }: DeleteTypeHasPermissoesRequest) {
    
    // Buscando no banco de dados
    const type_has_permissoes = await this.type_has_permissoesRepository.find({id});

    // Caso não existam no sistema, retorna erro
    if (!type_has_permissoes) {
      return new Error("Nada cadastrado!")
    } 

    // Se der tudo certo, exclui
    return await this.type_has_permissoesRepository.delete({id});
  }
}