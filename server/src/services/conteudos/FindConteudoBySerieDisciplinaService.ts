import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";
import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface
interface FindConteudoBySerieDisciplinaRequest {
  id: string;
  id_serie: string, 
  id_disciplina: string
}

// Service
export class FindConteudoBySerieDisciplinaService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private seriesRepository: SeriesRepository,
    private disciplinasRepository: DisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: FindConteudoBySerieDisciplinaRequest) {
    
    // Dados do service 
    const { id, id_serie, id_disciplina } = request;

    try {
      if (!(await this.conteudosRepository.find({ id }))) {
        return new Error("Conteúdo inexistente!");
      }
    } catch (err) {
      return err;
    }

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
      const conteudo = await this.conteudosRepository.findBySerieDisciplina({ id, id_serie, id_disciplina })
  
      // Verificando se o conteúdo existe
      if(!conteudo){
        // Se não existir, retorna errro
        return new Error("Conteúdo inexistente");
      }

      // Retornando os dados para o controller
      const aulas = [
        {
          name: "aulas",
          items: Object(conteudo).aulas
        },
        {
          name: "conteudos",
          items: Object(conteudo).conteudo
        },
        {
          name: "atividades",
          items: Object(conteudo).atividades
        },
        {
          name: "materiais",
          items: []
        },
      ]

      return aulas;


      return conteudo;
    } catch (err) {
      return err;
    }
  }
}