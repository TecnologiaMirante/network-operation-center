import { ProfessorHasDisciplinasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplinas-repository";
import { ProfessoresRepository } from "../../../repositories/interfaces/professores/professores-repository";
import { DisciplinasRepository } from "../../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface
interface CreateProfessorHasDisciplinaRequest {
  id_professor: string;
  id_disciplina: string;
}

// Service
export class CreateProfessorHasDisciplinaService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professorHasDisciplinasRepository: ProfessorHasDisciplinasRepository,
    private professoresRepository: ProfessoresRepository,
    private disciplinasRepository: DisciplinasRepository,
    ) {}

  // Executando o service
  async execute(request: CreateProfessorHasDisciplinaRequest) {
    
    // Dados do service
    const { id_professor, id_disciplina } = request;

    // Verificando se o professor existe
    if(!(await this.professoresRepository.find({id: id_professor}))){
      return new Error("Professor inexistente!");
    }
   
    // Verificando se a disciplina existe
    if(!(await this.disciplinasRepository.find({id: id_disciplina}))){
      return new Error("Disciplina inexistente!");
    }

    try {
      // Criando ...
      const registro = await this.professorHasDisciplinasRepository.create({
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