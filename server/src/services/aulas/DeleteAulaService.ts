import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";
import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";

// Interface
interface DeleteAulaRequest {
  id: string;
}

// Service
export class DeleteAulaService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private aulasRepository: AulasRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteAulaRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando 
    const aula = await this.aulasRepository.find({id});

    // Se não existir 
    if (!aula) {
      return new Error("aula inexistente!");
    }

    // Deletando a aula encontrada ...
    // return await this.aulasRepository.delete({id});
    return await this.aulasRepository.deleteAll();
  }
}