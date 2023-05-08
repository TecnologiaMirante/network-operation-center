import { ProfessorHasDisciplinasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplinas-repository";
import { ProfessoresRepository } from "../../../repositories/interfaces/professores/professores-repository";
import { DisciplinasRepository } from "../../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface
interface UpdateProfessorHasDisciplinaRequest {
  id: string;
  id_professor?: string;
  id_disciplina?: string;
}

// Service
export class UpdateProfessorHasDisciplinaService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professorHasDisciplinasRepository: ProfessorHasDisciplinasRepository,
    private professoresRepository: ProfessoresRepository,
    private disciplinasRepository: DisciplinasRepository,
    ) {}

  // Executando o service
  async execute(request: UpdateProfessorHasDisciplinaRequest) {
    
    // Dados do service
    const { id, id_professor, id_disciplina } = request;

    if (id_professor) {
      // Verificando se o professor existe
      if(!(await this.professoresRepository.find({id: id_professor}))){
        return new Error("Professor inexistente!");
      }
    }

    if (id_disciplina) {
      // Verificando se a disciplina existe
      if(!(await this.disciplinasRepository.find({id: id_disciplina}))){
        return new Error("Disciplina inexistente!");
      }
    }
    
    try {
      // Atualizando ...
      const registro = await this.professorHasDisciplinasRepository.update({
        id,
        id_professor,
        id_disciplina,
      })

      // Retornando dado para o controller
      return registro;

    } catch (err) {
      // Caso dê erro, retorna este para o controller
      return err;
    }
  }
}