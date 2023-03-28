import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";
import { TurmasRepository } from "../../repositories/interfaces/turmas/turmas-repository";
import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { DadosRepository } from "../../repositories/interfaces/dados/dados-repository";

// Interface do GetDadosByProfessor
interface GetDadosByProfessorServiceRequest {
  id_disciplina: string;
  id_turma: string;
  id_aluno: string;
}

// Service
export class GetDadosByProfessorService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private disciplinasRepository: DisciplinasRepository,
    private turmasRepository: TurmasRepository,
    private alunosRepository: AlunosRepository,
    private dadosRepository: DadosRepository,
  ) {}

  // Executando o service
  async execute({ id_disciplina, id_turma, id_aluno }: GetDadosByProfessorServiceRequest) {
    
    // Verificando se a disciplina existe
    if (id_disciplina != "todos") {
      if (!(await this.disciplinasRepository.find({ id: id_disciplina }))) {
          return new Error("Disciplina inexistente");
      }
    }

    if (id_turma != "todos") {
      // Verificando se a turma existe
      if (!(await this.turmasRepository.find({ id: id_turma }))) {
          return new Error("Turma inexistente");
      }
    }

    if (id_aluno != "todos") {
      // Verificando se o aluno existe
      if (!(await this.alunosRepository.find({ id: id_aluno }))) {
          return new Error("Aluno inexistente");
      }
    }

    try {
        // Buscando os dados
        const dados = await this.dadosRepository.getByProfessor({ id_disciplina, id_turma, id_aluno });

        // Caso não existam no sistema, retorna erro
        if (Object.keys(dados).length == 0) {
            return new Error("Nenhum dado cadastrado!")
        } 

        // Retornando os dados encontrados para o controller ...
        return dados;        
    } catch (err) {
        return err;
    }

  }
}