import { EscolaUserTypesRepository } from "../../repositories/interfaces/escolas/escolas-user-types-repository";
import { PermissoesRepository } from "../../repositories/interfaces/permissoes/permissoes-repository";
import { Type_has_permissoesRepository } from "../../repositories/interfaces/permissoes/user-type-has-permissoes-repository";

interface UpdateTypeHasPermissoesRequest {
  id: string;
  id_type?: string;
  id_permissao?: string;
}

export class UpdateTypeHasPermissoesService {
  
  // Recebendo o repositório no construtor
  constructor(
    private type_has_permissoesRepository: Type_has_permissoesRepository,
    private escolaUserTypeRepository: EscolaUserTypesRepository,
    private permissoesRepository: PermissoesRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateTypeHasPermissoesRequest) {

    // Dados do service
    const { id, id_type, id_permissao } = request;

    // Se o usuário não inserir NENHUM dado, retorna um erro
    if (!id_type && !id_permissao ) {
      return new Error("Por favor, insira algum dado!");
    }

    // Se o usuário inseriu o tipo
    if (id_type) {
      // Verificando se o tipo inserido existe no banco de dados
      if (!(await this.escolaUserTypeRepository.find({id: id_type}))) {
        return new Error("Tipo inexistente!");
      }
    }

    // Se o usuário inseriu a permissão
    if (id_permissao) {
      // Verificando se a permissão inserida existe no banco de dados
      if (!(await this.permissoesRepository.find({id: id_permissao}))) {
        return new Error("Permissão inexistente!");
      }
    }

    // Se der tudo certo, atualiza
    await this.type_has_permissoesRepository.update({
      id,
      id_type,
      id_permissao,
    })
  }
}