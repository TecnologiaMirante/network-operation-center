import { SerieHasDisciplinasRepository } from "../../../repositories/interfaces/series/serie-has-disciplinas-repository";

// Interface
interface FindSerieHasDisplinaRequest {
  id: string;
}

// Service
export class FindSerieHasDisplinaService {
  
  // Recebendo o repositório da SerieHasDisplina no construtor
  constructor(
    private serieHasDisplinasRepository: SerieHasDisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: FindSerieHasDisplinaRequest) {
    
    // Dados do service
    const { id } = request;

    // Criando ...
    const serieHasDisplina = await this.serieHasDisplinasRepository.find({
      id,
    })

    // Se não existir 
    if (!serieHasDisplina) {
      return new Error("Registro inexistente!");
    }

    return serieHasDisplina;
  }
}