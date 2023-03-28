import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";

// Interface
interface FindSerieRequest {
  id: string;
}

// Service
export class FindSerieService {
  
  // Recebendo o repositório da Serie no construtor
  constructor(
    private seriesRepository: SeriesRepository,
  ) {}

  // Executando o service
  async execute(request: FindSerieRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const serie = await this.seriesRepository.find({
      id, 
    })

    // Se não existir 
    if (!serie) {
      return new Error("Série inexistente!");
    }

    return serie;
  }
}