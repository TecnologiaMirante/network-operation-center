import { DisciplinasRepository, status_disciplina } from "../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface do createDisciplina
interface ChangeDisciplinaRequest {
  id: string;
  status: status_disciplina;
}

// Service
export class ChangeDisciplinaService {
  
  // Recebendo o repositório da Disciplina no construtor
  constructor(
    private disciplinasRepository: DisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: ChangeDisciplinaRequest) {
    
    // Dados do service
    const { id, status } = request;

    if (!(await this.disciplinasRepository.find({id}))) {
      return new Error("Disciplina inexistente!");
    }

    // Atualizando ...
    const disciplina = await this.disciplinasRepository.changeStatus({
      id,
      status
    })

    return disciplina;
  }
}