import { SerieHasDisciplinasRepository } from "../../../repositories/interfaces/series/serie-has-disciplinas-repository";

// Service
export class GetSerieHasDisplinasService {
  
  // Recebendo o repositório da SerieHasDisplina no construtor
  constructor(
    private serieHasDisplinasRepository: SerieHasDisciplinasRepository,
  ) {}

  // Executando o service
  async execute() {
    
    // Criando ...
    const serieHasDisplina = await this.serieHasDisplinasRepository.get();

    // Se não existir 
    if (Object.keys(serieHasDisplina).length == 0) {
      return new Error("Registro inexistente!");
    }

    return serieHasDisplina;
  }
}