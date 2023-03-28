import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";

// Interface
interface GetAulasBySerieDisciplinaRequest {
    id_serie: string;
    id_disciplina: string;
}

// Service
export class GetAulasBySerieDisciplinaService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private aulasRepository: AulasRepository,
  ) {}

  // Executando o service
  async execute(request: GetAulasBySerieDisciplinaRequest) {
    
    // Dados do service
    const { id_serie, id_disciplina } = request;

    try {
      // Buscando ...
      const aula = await this.aulasRepository.getBySerieDisciplina({
        id_serie, 
        id_disciplina
      })

      return aula;

    } catch (err) {
      return new Error("Erro durante a busca das aulas!");
    }
  }
}