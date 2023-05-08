import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { LembretesRepository } from "../../repositories/interfaces/lembretes/lembretes-repository";
import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { TurmasRepository } from "../../repositories/interfaces/turmas/turmas-repository";

// Interface
interface GetLembretesByAlunoRequest {
  id_aluno: string;
}

// Service
export class GetLembretesByAlunoService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private lembretesRepository: LembretesRepository,
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: GetLembretesByAlunoRequest) {
    
    // Dados do service
    const { id_aluno } = request;

    // Se id_aluno for inserido, busca se a turma existe e retorna erro caso não
    if (!(await this.alunosRepository.find({ id: id_aluno }))) {
      return new Error("Aluno inexistente!")
    }

    // Criando ...
    const lembrete = await this.lembretesRepository.getByAluno({
      id_aluno, 
    })

    return lembrete;
  }
}