import { EscolaUserTypesRepository } from "../../../repositories/interfaces/escolas/escolas-user-types-repository";

interface DeleteEscolaUserTypeRequest {
  id: string;
}

// Service
export class DeleteEscolaUserTypeService {

  // Recebendo o repositório do Tipo no construtor
  constructor(
    private escolaUserTypeRepository: EscolaUserTypesRepository,
  ) {}

  // Executando o service
  async execute({ id }: DeleteEscolaUserTypeRequest) {

    // Buscando o tipo
    const userType = await this.escolaUserTypeRepository.find({id});

    // Se não existir tipo
    if (!userType) {
      return new Error("Tipo inexistente!");
    }

    // Se existir, retorna para o controller
    return await this.escolaUserTypeRepository.delete({id});
  }
}