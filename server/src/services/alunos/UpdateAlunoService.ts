import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { EscolaUsersRepository } from "../../repositories/interfaces/escolas/escolas-users-repository";
import { TurmasRepository } from "../../repositories/interfaces/turmas/turmas-repository";

// Interface
interface UpdateAlunoRequest {
  id: string;
  id_escola_user?: string;
  id_turma?: string;
}

// Service
export class UpdateAlunoService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private alunosRepository: AlunosRepository,
    private escolaUsersRepository: EscolaUsersRepository,
    private turmasRepository: TurmasRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateAlunoRequest) {
    
    // Dados do service
    const { id, id_escola_user, id_turma } = request;

    if (id_escola_user) {
      // Verificando se o usuário existe
      if(!(await this.escolaUsersRepository.find({id: id_escola_user}))){
        return new Error("Usuário inexistente!");
      }
    }

    if (id_turma) {
      // Verificando se a turma existe
      if(!(await this.turmasRepository.find({id: id_turma}))){
        return new Error("Turma inexistente!");
      }
    }

    // Criando ...
    const aluno = await this.alunosRepository.update({
      id,
      id_escola_user,
      id_turma
    })

    return aluno;
  }
}