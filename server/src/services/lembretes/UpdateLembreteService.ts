import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { LembretesRepository } from "../../repositories/interfaces/lembretes/lembretes-repository";
import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { TurmasRepository } from "../../repositories/interfaces/turmas/turmas-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";
import { SerieHasDisciplinasRepository } from "../../repositories/interfaces/series/serie-has-disciplinas-repository";

// Interface
interface UpdateLembreteRequest {
  id: string;
  title: string;
  description: string;
  data: Date;
  data_masked: string;
  start: Date;
  end: Date;
  id_turma?: string;    
  id_disciplina?: string;
  id_aluno?: string;
  id_professor?: string;
}

// Service
export class UpdateLembreteService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private lembretesRepository: LembretesRepository,
    private turmasRepository: TurmasRepository,
    private disciplinasRepository: DisciplinasRepository,
    private professoresRepository: ProfessoresRepository,
    private alunosRepository: AlunosRepository,
    private serieHasDisciplinasRepository: SerieHasDisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateLembreteRequest) {
    
    // Dados do service
    const { id, title, description, data, data_masked, start, end, id_turma, id_disciplina, id_aluno, id_professor } = request;

    // Se id_turma for inserido, busca se a turma existe e retorna erro caso não
    if (id_turma) {
      if (!(await this.turmasRepository.find({ id: id_turma }))) {
        return new Error("Turma inexistente!")
      }

      if (id_disciplina) {
  
        // Pegando o id da série com base na turma
        const serie = await this.turmasRepository.getSerieByTurma({ id: id_turma });
  
        if (serie) {
          // Verificando se existe relacionamento entre a série e a disciplina
          const relation = await this.serieHasDisciplinasRepository.findRelation({ id_disciplina, id_serie: Object(serie).serie.id });

          if (!relation) {
            return new Error("Disciplina não cadastrada na série")
          }
        }
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
    const lembrete = await this.lembretesRepository.update({
      id,
      title,
      description,
      data,
      data_masked,
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