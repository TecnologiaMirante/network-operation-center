import { SerieHasDisciplinasRepository } from "../../../repositories/interfaces/series/serie-has-disciplinas-repository";

// Interface
interface DeleteSerieHasDisplinaRequest {
  id: string;
}

// Service
export class DeleteSerieHasDisplinaService {
  
  // Recebendo o repositório da SerieHasDisplina no construtor
  constructor(
    private serieHasDisplinasRepository: SerieHasDisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteSerieHasDisplinaRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const serieHasDisplina = await this.serieHasDisplinasRepository.find({
      id,
    })

    // Se não existir 
    if (!serieHasDisplina) {
      return new Error("Registro inexistente!");
    }

    // Deletando a serie encontrada ...
    return this.serieHasDisplinasRepository.delete({id});
  }
}