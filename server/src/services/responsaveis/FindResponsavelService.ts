import { EscolaUsersRepository } from "../../repositories/interfaces/escolas/escolas-users-repository";
import { ResponsaveisRepository } from "../../repositories/interfaces/responsaveis/responsaveis-repository";

interface FindResponsavelRequest {
  id: string;
}

export class FindResponsavelService {

  // Recebendo o repositório no construtor
  constructor(
    private responsaveisRepository: ResponsaveisRepository,
  ) {}

  // Executando o service
    async execute(request: FindResponsavelRequest) {

      // Dados do service
      const { id } = request;

      // Buscando
      const resp = await this.responsaveisRepository.find({id});

      // Caso não existam resposáveis no sistema, retorna erro
      if (!resp) {
        return new Error("Responsável inexistente!")
      }

    // Se der tudo certo, retorna os dados encontrados
      return resp;
    }
}