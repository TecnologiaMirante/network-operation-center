import { ProfessorHasDisciplinasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplinas-repository";

interface GetProfessorHasDisciplinasByProfessorRequest {
  id_professor: string;
}

// Service
export class GetProfessorHasDisciplinasByProfessorService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professorHasDisciplinasRepository: ProfessorHasDisciplinasRepository,
    ) {}

  // Executando o service
  async execute(request: GetProfessorHasDisciplinasByProfessorRequest) {
    
    const { id_professor } = request;

    try {
      // Buscando ...
      const series = await this.professorHasDisciplinasRepository.getDisciplinasByProfessor({ id_professor });

      if (Object.keys(series).length == 0) {
        return new Error("Nenhuma disciplina cadastrada!");
      }

      // Retornando dado para o controller
      return series;

    } catch (err) {
      // Caso dê erro, retorna este para o controller
      return err;
    }
  }
}