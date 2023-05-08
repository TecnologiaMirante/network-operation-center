import { ProfessorHasDisciplinaTurmasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplina-turmas-repository";

// Interface
interface FindProfessorHasDisciplinaTurmaRequest {
  id: string;
}

// Service
export class FindProfessorHasDisciplinaTurmaService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professorHasDisciplinaTurmasRepository: ProfessorHasDisciplinaTurmasRepository,
    ) {}

  // Executando o service
  async execute(request: FindProfessorHasDisciplinaTurmaRequest) {
    
    // Dados do service
    const { id } = request;

    try {
      // Buscando ...
      const registro = await this.professorHasDisciplinaTurmasRepository.find({
        id,
      })

      // Retornando dado para o controller
      return registro;

    } catch (err) {
      // Caso dê erro, retorna este para o controller
      return err;
    }
  }
}