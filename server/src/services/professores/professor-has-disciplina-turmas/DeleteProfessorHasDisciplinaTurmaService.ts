import { ProfessorHasDisciplinaTurmasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplina-turmas-repository";

// Interface
interface DeleteProfessorHasDisciplinaTurmaRequest {
  id: string;
}

// Service
export class DeleteProfessorHasDisciplinaTurmaService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professorHasDisciplinaTurmasRepository: ProfessorHasDisciplinaTurmasRepository,
    ) {}

  // Executando o service
  async execute(request: DeleteProfessorHasDisciplinaTurmaRequest) {
    
    // Dados do service
    const { id } = request;

    // Verificando se o registro existe no banco
    const registro = await this.professorHasDisciplinaTurmasRepository.find({
      id,
    })

    // Se o registro não existir, retorna erro
    if (!registro) {
      return new Error("Registro inexistente!");
    }

    try {
      // Deletando ...
      const registro_deletado = await this.professorHasDisciplinaTurmasRepository.delete({
        id,
      })

      // Retornando dado para o controller
      return registro_deletado;

    } catch (err) {
      // Caso dê erro, retorna este para o controller
      return err;
    }
  }
}