import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";

// Interface
interface FindAlunoByUserRequest {
  id_user: string;
}

// Service
export class FindAlunoByUserService {

  // Recebendo o repositório da Aluno no construtor
  constructor(
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: FindAlunoByUserRequest) {
    
    // Dados do service
    const { id_user } = request;

    // Buscando ...
    const aluno = await this.alunosRepository.findByUser({
      id_escola_user:id_user,
    })

    // Se não existir 
    if (!aluno) {
      return new Error("Aluno inexistente!");
    }

    // Retornando o aluno encontrado ...
    return aluno;
  }
}