import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";
import { EscolasRepository } from "../../repositories/interfaces/escolas/escolas-repository";

// Interface do createSerie
interface CreateSerieRequest {
  name: string;
  id_escola: string;
}

// Service
export class CreateSerieService {
  
  // Recebendo o repositório da Serie no construtor
  constructor(
    private SeriesRepository: SeriesRepository,
    private escolasRepository: EscolasRepository,
  ) {}

  // Executando o service
  async execute(request: CreateSerieRequest) {
    
    // Dados do service
    const { name, id_escola } = request;

    // Verificando se a escola existe
    if(!(await this.escolasRepository.find({id: id_escola}))){
      return new Error("Escola inexistente!");
    }

    // Criando ...
    const serie = await this.SeriesRepository.create({
      name,
      id_escola
    })

    return serie;
  }
}