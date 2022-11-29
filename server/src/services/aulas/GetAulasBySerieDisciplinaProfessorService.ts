import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";

// Interface
interface GetAulasBySerieDisciplinaProfessorRequest {
    id_serie: string;
    id_disciplina: string;
}

// Service
export class GetAulasBySerieDisciplinaProfessorService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private aulasRepository: AulasRepository,
  ) {}

  // Executando o service
  async execute(request: GetAulasBySerieDisciplinaProfessorRequest) {
    
    // Dados do service
    const { id_serie, id_disciplina } = request;

    try {
      // Buscando ...
      const itens = await this.aulasRepository.getBySerieDisciplinaProfessor({
        id_serie, 
        id_disciplina
      })

      const aulas = [
        {
          name: "aulas",
          items: Object(itens).aulas
        },
        {
          name: "conteudos",
          // items: Object(itens).conteudos
          items: []
        },
        {
          name: "atividades",
          items: Object(itens).atividades
        },
        {
          name: "materiais",
          items: []
        },
      ]

      return aulas;

    } catch (err) {
      return new Error("Erro durante a busca das aulas!");
    }
  }
}