import { EscolaUserTypesRepository } from "../../../repositories/interfaces/escolas/escolas-user-types-repository";

interface CreateEscolaUserTypeRequest {
  name: string;
}

export class CreateEscolaUserTypeService {
  
  // Recebendo o repositório da EscolaUserType no construtor
  constructor(
    private escolaUserTypeRepository: EscolaUserTypesRepository,
  ) {}

  // Executando o service
  async execute(request: CreateEscolaUserTypeRequest) {

    // Dados do service
    const { name } = request;

    // Se o usuário não inserir os dados obrigatórios
    if (!name) {
      return new Error(`Por favor, preencha todos os campos obrigatórios!`);
    }

    // Criando a EscolaUserType
    await this.escolaUserTypeRepository.create({
      name
    });
  }

}