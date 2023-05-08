import { ProfessorHasDisciplinaTurmasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplina-turmas-repository";

interface GetSeriesProfessorHasDisciplinaTurmasRequest {
  id_professor: string;
}

// Service
export class GetSeriesProfessorHasDisciplinaTurmasService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professorHasDisciplinaTurmasRepository: ProfessorHasDisciplinaTurmasRepository,
    ) {}

  // Executando o service
  async execute(request: GetSeriesProfessorHasDisciplinaTurmasRequest) {
    
    const { id_professor } = request;

    try {
      // Buscando ...
      const series = await this.professorHasDisciplinaTurmasRepository.getSeriesByProfessor({ id_professor });

      if (Object.keys(series).length == 0) {
        return new Error("Nenhuma série cadastrada!");
      }

      // Retornando dado para o controller
      return series;

    } catch (err) {
      // Caso dê erro, retorna este para o controller
      return err;
    }
  }
}