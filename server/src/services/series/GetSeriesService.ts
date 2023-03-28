import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";

// Service
export class GetSeriesService {
  
  // Recebendo o repositório da Serie no construtor
  constructor(
    private seriesRepository: SeriesRepository,
  ) {}

  // Executando o service
  async execute() {
    
    // Buscando ...
    const series = await this.seriesRepository.get()

    // Caso não existam Escolas no sistema, retorna erro
    if (Object.keys(series).length == 0) {
      return new Error("Nenhuma serie cadastrada!")
    } 

    return series;
  }
}