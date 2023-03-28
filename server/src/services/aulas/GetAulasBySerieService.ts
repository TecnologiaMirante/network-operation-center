import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";

// Interface
interface GetAulasBySerieRequest {
    id_serie: string;
}

// Service
export class GetAulasBySerieService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private aulasRepository: AulasRepository,
  ) {}

  // Executando o service
  async execute(request: GetAulasBySerieRequest) {
    
    // Dados do service
    const { id_serie } = request;

    try {
      // Buscando ...
      const aula = await this.aulasRepository.getBySerie({
        id_serie, 
      })

      return aula;

    } catch (err) {
      return new Error("Erro durante a busca das aulas!");
    }
  }
}