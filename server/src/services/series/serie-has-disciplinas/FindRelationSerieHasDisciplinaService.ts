import { SerieHasDisciplinasRepository } from "../../../repositories/interfaces/series/serie-has-disciplinas-repository";

// Interface
interface FindRelationSerieHasDisplinaRequest {
  id_disciplina: string;
  id_serie: string;
}

// Service
export class FindRelationSerieHasDisciplinaService {
  
  // Recebendo o repositório da SerieHasDisplina no construtor
  constructor(
    private serieHasDisplinasRepository: SerieHasDisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: FindRelationSerieHasDisplinaRequest) {
    
    // Dados do service
    const { id_disciplina, id_serie } = request;

    // Criando ...
    const relation = await this.serieHasDisplinasRepository.findRelation({
      id_disciplina,
      id_serie
    })

    // Se não existir 
    if (!relation) {
      return new Error("Relação inexistente!");
    }

    return relation;
  }
}