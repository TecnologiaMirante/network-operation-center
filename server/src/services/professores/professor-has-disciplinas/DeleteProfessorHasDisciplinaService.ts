import { ProfessorHasDisciplinasRepository } from "../../../repositories/interfaces/professores/professor-has-disciplinas-repository";

// Interface
interface DeleteProfessorHasDisciplinaRequest {
  id: string;
}

// Service
export class DeleteProfessorHasDisciplinaService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professorHasDisciplinasRepository: ProfessorHasDisciplinasRepository,
    ) {}

  // Executando o service
  async execute(request: DeleteProfessorHasDisciplinaRequest) {
    
    // Dados do service
    const { id } = request;

    // Verificando se o registro existe no banco
    const registro = await this.professorHasDisciplinasRepository.find({
      id,
    })

    // Se o registro não existir, retorna erro
    if (!registro) {
      return new Error("Registro inexistente!");
    }

    try {
      // Deletando ...
      const registro_deletado = await this.professorHasDisciplinasRepository.delete({
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