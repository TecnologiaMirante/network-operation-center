import { AtividadesRepository } from "../../repositories/interfaces/atividades/atividades-repository";

// Service
export class GetAtividadesService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando ...
    const atividades = await this.atividadesRepository.get()

    // Caso não existam no sistema, retorna erro
    if (Object.keys(atividades).length == 0) {
      return new Error("Nenhuma atividade cadastrada!")
    } 

    // Se der tudo certo, retorna para o controller os dados encontrados
    return atividades;
  }
}