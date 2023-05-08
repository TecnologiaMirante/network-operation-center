import { ProfessorHasDisciplinaTurmasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplina-turmas-repository";

// Service
export class GetProfessorHasDisciplinaTurmasService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professorHasDisciplinaTurmasRepository: ProfessorHasDisciplinaTurmasRepository,
    ) {}

  // Executando o service
  async execute() {
    
    try {
      // Buscando ...
      const registros = await this.professorHasDisciplinaTurmasRepository.get();

      if (Object.keys(registros).length == 0) {
        return new Error("Nenhum registro cadastrado!");
      }

      // Retornando dado para o controller
      return registros;

    } catch (err) {
      // Caso dê erro, retorna este para o controller
      return err;
    }
  }
}