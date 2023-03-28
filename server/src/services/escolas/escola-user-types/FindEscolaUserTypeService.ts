import { EscolaUserTypesRepository } from "../../../repositories/interfaces/escolas/escolas-user-types-repository";

interface FindEscolaUserTypeRequest {
  id: string;
}

// Service
export class FindEscolaUserTypeService {

  // Recebendo o repositório do Tipo no construtor
  constructor(
    private escolaUserTypeRepository: EscolaUserTypesRepository,
  ) {}

  // Executando o service
    async execute({ id }: FindEscolaUserTypeRequest) {

      // Buscando o tipo
      const userType = await this.escolaUserTypeRepository.find({id});

      // Se não existir tipo
      if (!userType) {
        return new Error("Tipo inexistente!");
      }

      // Se existir, retorna para o controller
      return userType;
    }
}