import { EscolaUserTypesRepository } from "../../../repositories/interfaces/escolas/escolas-user-types-repository";

interface UpdateEscolaUserTypeRequest {
  id: string
  name: string;
}

export class UpdateEscolaUserTypeService {
  
  // Recebendo o repositório da EscolaUserType no construtor
  constructor(
    private escolaUserTypeRepository: EscolaUserTypesRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateEscolaUserTypeRequest) {

    // Dados do service
    const { id, name } = request;

    // Se não existir tipo, retorna mensagem de erro
    if (!(await this.escolaUserTypeRepository.find({id}))) {
      return new Error("Tipo inexistente!");
    }

    // Se o usuário não inserir os dados obrigatórios
    if (!name) {
      return new Error(`Por favor, preencha todos os campos obrigatórios!`);
    }

    // Atualizando a EscolaUserType
    await this.escolaUserTypeRepository.update({
      id,
      name,
    });

    return;
  }
}