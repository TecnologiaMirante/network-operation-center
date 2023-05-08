import { ProfessorHasDisciplinasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplinas-repository";

// Service
export class GetProfessorHasDisciplinasService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professorHasDisciplinasRepository: ProfessorHasDisciplinasRepository,
    ) {}

  // Executando o service
  async execute() {
    
    try {
      // Buscando ...
      const series = await this.professorHasDisciplinasRepository.get();

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