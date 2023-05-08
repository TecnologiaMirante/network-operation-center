import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface do createDisciplina
interface GetDisciplinasByAlunoRequest {
  id_aluno: string;
}

// Service
export class GetDisciplinasByAlunoService {
  
  // Recebendo o repositório da Disciplina no construtor
  constructor(
    private disciplinasRepository: DisciplinasRepository,
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: GetDisciplinasByAlunoRequest) {
    
    // Dados do service
    const { id_aluno } = request;

    if (!(await this.alunosRepository.find( {id: id_aluno} ))) {
      return new Error("Aluno inexistente!")
    }

    // Buscando ...
    const disciplinas = await this.disciplinasRepository.getByAluno({
      id_aluno,
    })

    // Se não existir 
    if (!disciplinas) {
      return new Error("Disciplina inexistente!");
    }

    return disciplinas;
  }
}