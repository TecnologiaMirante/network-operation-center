import { EscolaUserTypesRepository } from "../../repositories/interfaces/escolas/escolas-user-types-repository";
import { PermissoesRepository } from "../../repositories/interfaces/permissoes/permissoes-repository";
import { Type_has_permissoesCustomRepository } from "../../repositories/interfaces/permissoes/user-type-has-permissoes-custom-repository";
import { EscolaUsersRepository } from "../../repositories/interfaces/escolas/escolas-users-repository";

interface UpdateTypeHasPermissoesCustomRequest {
  id: string;
  id_type?: string;
  id_permissao?: string;
  id_escola_user?: string;
}

export class UpdateTypeHasPermissoesCustomService {
  
  // Recebendo o repositório no construtor
  constructor(
    private type_has_permissoesCustomRepository: Type_has_permissoesCustomRepository,
    private escolaUserTypeRepository: EscolaUserTypesRepository,
    private permissoesRepository: PermissoesRepository,
    private escolaUsersRepository: EscolaUsersRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateTypeHasPermissoesCustomRequest) {

    // Dados do service
    const { id, id_type, id_permissao, id_escola_user} = request;

    // Se o usuário não inserir NENHUM dado, retorna um erro
    if (!id_type && !id_permissao && !id_escola_user) {
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

    // Se o usuário inseriu o usuário
    if (id_escola_user) {
      // Verificando se a permissão inserida existe no banco de dados
      if (!(await this.escolaUsersRepository.find({id: id_escola_user}))) {
        return new Error("Usuário inexistente!");
      }
    }

    // Se der tudo certo, atualiza
    await this.type_has_permissoesCustomRepository.update({
      id,
      id_type,
      id_permissao,
      id_escola_user
    })
  }
}