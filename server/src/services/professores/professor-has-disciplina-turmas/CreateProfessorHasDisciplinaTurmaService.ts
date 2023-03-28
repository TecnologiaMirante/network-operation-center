import { ProfessorHasDisciplinaTurmasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplina-turmas-repository";
import { ProfessorHasDisciplinasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplinas-repository";
import { TurmasRepository } from "../../../repositories/interfaces/turmas/turmas-repository";

// Interface
interface CreateProfessorHasDisciplinaTurmaRequest {
  id_professor_has_disciplinas: string;
  id_turma: string;
}

// Service
export class CreateProfessorHasDisciplinaTurmaService {
  
  // Recebendo o repositório no construtor
  constructor(
    private professorHasDisciplinaTurmasRepository: ProfessorHasDisciplinaTurmasRepository,
    private professorHasDisciplinasRepository: ProfessorHasDisciplinasRepository,
    private turmasRepository: TurmasRepository,
    ) {}

  // Executando o service
  async execute(request: CreateProfessorHasDisciplinaTurmaRequest) {
    
    // Dados do service
    const { id_professor_has_disciplinas, id_turma } = request;

    // Verificando se o registro entre professor e disciplina existe
    if(!(await this.professorHasDisciplinasRepository.find({id: id_professor_has_disciplinas}))){
      return new Error("Registro entre professor e disciplina inexistente!");
    }
   
    // Verificando se a turma existe
    if(!(await this.turmasRepository.find({id: id_turma}))){
      return new Error("Turma inexistente!");
    }

    try {
      // Criando ...
      const registro = await this.professorHasDisciplinaTurmasRepository.create({
        id_professor_has_disciplinas,
        id_turma
      })

      // Retornando dado para o controller
      return registro;

    } catch (err) {
      // Caso dê erro, retorna este para o controller
      return err;
    }
  }
}