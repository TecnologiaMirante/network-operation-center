import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";

// Service
export class GetProfessoresService {
  
  // Recebendo o repositório no construtor
  constructor(
    private professoresRepository: ProfessoresRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando
    const professores = await this.professoresRepository.get();

    // Caso não existam no sistema, retorna erro
    if (Object.keys(professores).length == 0) {
      return new Error("Nenhum professor cadastrado!")
    } 

    // Se der tudo certo, retorna para o controller os dados encontrados
    return professores;
  }
}