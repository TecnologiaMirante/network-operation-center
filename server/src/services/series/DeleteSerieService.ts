import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";

// Interface do createSerie
interface DeleterieRequest {
  id: string;
}

// Service
export class DeleteSerieService {
  
  // Recebendo o repositório da Serie no construtor
  constructor(
    private seriesRepository: SeriesRepository,
  ) {}

  // Executando o service
  async execute(request: DeleterieRequest) {
    
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

    // Deletando a serie encontrada ...
    return this.seriesRepository.delete({id});
  }
}