import { ResponsaveisRepository } from "../../repositories/interfaces/responsaveis/responsaveis-repository";

interface DeleteResponsavelRequest {
  id: string;
}

export class DeleteResponsavelService {

  // Recebendo o repositório no construtor
  constructor(
    private responsaveisRepository: ResponsaveisRepository,
  ) {}

  // Executando o service
    async execute(request: DeleteResponsavelRequest) {

      // Dados do service
      const { id } = request;

      // Buscando
      const resp = await this.responsaveisRepository.find({id});

      // Caso não existam resposáveis no sistema, retorna erro
      if (!resp) {
        return new Error("Responsável inexistente!")
      }

    // Se der tudo certo, retorna os dados encontrados
      return this.responsaveisRepository.delete({id});
    }
}