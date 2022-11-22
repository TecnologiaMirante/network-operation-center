import { ProfessorHasDisciplinasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplinas-repository";

// Interface
interface FindProfessorHasDisciplinaRequest {
  id: string;
}

// Service
export class FindProfessorHasDisciplinaService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professorHasDisciplinasRepository: ProfessorHasDisciplinasRepository,
    ) {}

  // Executando o service
  async execute(request: FindProfessorHasDisciplinaRequest) {
    
    // Dados do service
    const { id } = request;

    try {
      // Buscando ...
      const registro = await this.professorHasDisciplinasRepository.find({
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