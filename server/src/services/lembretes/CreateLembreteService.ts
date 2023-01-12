import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { LembretesRepository } from "../../repositories/interfaces/lembretes/lembretes-repository";
import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { TurmasRepository } from "../../repositories/interfaces/turmas/turmas-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface
interface CreateLembreteRequest {
  title: string;
  description: string;
  data: Date;
  start: Date;
  end: Date;
  id_turma?: string;    
  id_disciplina?: string;
  id_aluno?: string;
  id_professor?: string;
}

// Service
export class CreateLembreteService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private lembretesRepository: LembretesRepository,
    private turmasRepository: TurmasRepository,
    private disciplinasRepository: DisciplinasRepository,
    private professoresRepository: ProfessoresRepository,
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: CreateLembreteRequest) {
    
    // Dados do service
    const { title, description, data, start, end, id_turma, id_disciplina, id_aluno, id_professor } = request;

    // Se id_turma for inserido, busca se a turma existe e retorna erro caso não
    if (id_turma) {
      if (!(await this.turmasRepository.find({ id: id_turma }))) {
        return new Error("Turma inexistente!")
      }
    }

    if (id_disciplina) {
      if (!(await this.disciplinasRepository.find({ id: id_disciplina }))) {
        return new Error("Disciplina inexistente!")
      }
    }

    // Se id_aluno for inserido, busca se a turma existe e retorna erro caso não
    if (id_aluno) {
      if (!(await this.alunosRepository.find({ id: id_aluno }))) {
        return new Error("Aluno inexistente!")
      }
    }

    // Se id_professor for inserido, busca se a turma existe e retorna erro caso não
    if (id_professor) {
      if (!(await this.professoresRepository.find({ id: id_professor }))) {
        return new Error("Professor inexistente!")
      }
    }

    // Criando ...
    const lembrete = await this.lembretesRepository.create({
      title,
      description,
      data,
      start,
      end,
      id_turma, 
      id_disciplina,
      id_aluno, 
      id_professor
    })

    return lembrete;
  }
}