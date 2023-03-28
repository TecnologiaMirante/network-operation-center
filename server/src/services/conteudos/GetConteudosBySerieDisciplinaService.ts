import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";
import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface
interface GetConteudosBySerieDisciplinaRequest {
  id_professor: string,
  id_serie: string, 
  id_disciplina: string
}

// Service
export class GetConteudosBySerieDisciplinaService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private seriesRepository: SeriesRepository,
    private disciplinasRepository: DisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: GetConteudosBySerieDisciplinaRequest) {
    
    // Dados do service 
    const { id_professor, id_serie, id_disciplina } = request;

    try {
      if (!(await this.seriesRepository.find({ id: id_serie }))) {
        return new Error("Série inexistente!")
      }
    } catch( err) {
      return err;
    }

    try {
      if (!(await this.disciplinasRepository.find({ id: id_disciplina }))) {
        return new Error("Disciplina inexistente!")
      }
    } catch( err) {
      return err;
    }

    try {
      // Buscando ...
      const conteudos = await this.conteudosRepository.getBySerieDisciplina({ id_professor, id_serie, id_disciplina })

      // Verificando se o conteúdo existe
      if(!conteudos){
        // Se não existir, retorna errro
        return new Error("Conteúdo inexistente");
      }

      return conteudos;
    } catch (err) {
      return err;
    }
  }
}