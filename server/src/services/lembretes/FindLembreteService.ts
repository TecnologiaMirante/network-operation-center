import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { LembretesRepository } from "../../repositories/interfaces/lembretes/lembretes-repository";
import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { TurmasRepository } from "../../repositories/interfaces/turmas/turmas-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface
interface FindLembreteRequest {
  id: string;
}

// Service
export class FindLembreteService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private lembretesRepository: LembretesRepository,
    private turmasRepository: TurmasRepository,
    private disciplinasRepository: DisciplinasRepository,
    private professoresRepository: ProfessoresRepository,
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: FindLembreteRequest) {
    
    // Dados do service
    const { id } = request;

    // Criando ...
    const lembrete = await this.lembretesRepository.find({
      id,
    })

    return lembrete;
  }
}