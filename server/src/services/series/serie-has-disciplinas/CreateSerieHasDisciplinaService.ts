import { SerieHasDisciplinasRepository } from "../../../repositories/interfaces/series/serie-has-disciplinas-repository";
import { SeriesRepository } from "../../../repositories/interfaces/series/series-repository";
import { DisciplinasRepository } from "../../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface do createSerie
interface CreateSerieHasDisplinaRequest {
  id_serie: string;
  id_disciplina: string;
}

// Service
export class CreateSerieHasDisplinaService {
  
  // Recebendo o repositório da SerieHasDisplina no construtor
  constructor(
    private serieHasDisplinasRepository: SerieHasDisciplinasRepository,
    private seriesRepository: SeriesRepository,
    private disciplinasRepository: DisciplinasRepository
  ) {}

  // Executando o service
  async execute(request: CreateSerieHasDisplinaRequest) {
    
    // Dados do service
    const { id_serie, id_disciplina } = request;

    // Verificando se a serie existe
    if(!(await this.seriesRepository.find({id: id_serie}))){
      return new Error("Série inexistente!");
    }

    // Verificando se a disciplina existe
    if(!(await this.disciplinasRepository.find({id: id_disciplina}))){
      return new Error("Disciplina inexistente!");
    }

    // Criando ...
    const serieHasDisplina = await this.serieHasDisplinasRepository.create({
      id_serie,
      id_disciplina
    })

    return serieHasDisplina;
  }
}