import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";

// Interface
interface FindAlunoRequest {
  id: string;
}

// Service
export class FindAlunoService {

  // Recebendo o repositório da Aluno no construtor
  constructor(
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: FindAlunoRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const aluno = await this.alunosRepository.find({
      id,
    })

    // Se não existir 
    if (!aluno) {
      return new Error("Aluno inexistente!");
    }

    // Retornando o aluno encontrado ...
    return aluno;
  }
}