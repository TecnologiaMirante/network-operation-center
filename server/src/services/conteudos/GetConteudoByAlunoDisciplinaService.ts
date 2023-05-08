import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";
// Interface
interface GetConteudoByAlunoRequest {
  id_aluno: string;
  id_disciplina: string;
}

// Service
export class GetConteudoByAlunoDisciplinaService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private alunosRepository: AlunosRepository,
    private disciplinasRepository: DisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: GetConteudoByAlunoRequest) {
    
    // Dados do service 
    const { id_aluno, id_disciplina } = request;

    // Verificando se o aluno existe
    if (!(await this.alunosRepository.find({ id:id_aluno }))) {
      return new Error("Aluno inexistente!");
    }

    // Verificando se a disciplina existe
    if(!(await this.disciplinasRepository.find({ id: id_disciplina }))) {
      return new Error("Disciplina inexistente!");
    }

    // Buscando ...
    const conteudos = await this.conteudosRepository.getByAlunoDisciplina({ id_aluno, id_disciplina })

    // Verificando se o conteúdo existe
    if(Object.keys(conteudos).length == 0){
      // Se não existir, retorna errro
      return new Error("Conteúdo inexistente");
    }

    // Retornando os dados para o controller
    return conteudos;
  }
}