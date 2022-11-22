import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";
import { EscolasRepository } from "../../repositories/interfaces/escolas/escolas-repository";

// Interface do createSerie
interface UpdateSerieRequest {
  id: string;
  name?: string;
  id_escola?: string;
}

// Service
export class UpdateSerieService {
  
  // Recebendo o repositório da Serie no construtor
  constructor(
    private SeriesRepository: SeriesRepository,
    private escolasRepository: EscolasRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateSerieRequest) {
    
    // Dados do service
    const { id, name, id_escola } = request;

    if (id_escola) {
      // Verificando se a escola existe
      if(!(await this.escolasRepository.find({id: id_escola}))){
        return new Error("Escola inexistente!");
      }
    }

    // Atualizando ...
    const serie = await this.SeriesRepository.update({
      id, 
      name,
      id_escola
    })

    return serie;
  }
}