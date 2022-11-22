import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";
import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";

// Interface
interface UpdateAulaRequest {
  id: string;
  hash: string;
  title?: string;
  file?: string;
  thumb?: string;
  time?: string;
  id_serie?: string;
  id_disciplina?: string;
  id_conteudo?: string;
}

// Service
export class UpdateAulaService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private aulasRepository: AulasRepository,
    private disciplinasRepository: DisciplinasRepository,
    private seriesRepository: SeriesRepository
  ) {}

  // Executando o service
  async execute(request: UpdateAulaRequest) {
    
    // Dados do service
    const { id, hash, title, file, thumb, time, id_serie, id_disciplina, id_conteudo } = request;

    if (id_disciplina) {
      // Verificando se a disciplina existe
      if(!(await this.disciplinasRepository.find({id: id_disciplina}))){
        return new Error("Disciplina inexistente!");
      }
    }

    if (id_serie) {
      // Verificando se a serie existe
      if(!(await this.seriesRepository.find({id: id_serie}))){
        return new Error("Série inexistente!");
      }
    }

    try {
      // Criando ...
      const aula = await this.aulasRepository.update({
        id,
        hash, 
        title, 
        file, 
        thumb,
        time, 
        id_serie, 
        id_disciplina,
        id_conteudo
      })

      return aula;

    } catch (err) {
      return new Error("Erro durante a atualização da aula!");
    }
  }
}