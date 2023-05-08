import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";

// Interface
interface DeleteAlunoRequest {
  id: string;
}

// Service
export class DeleteAlunoService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteAlunoRequest) {
    
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

    // Deletando o aluno encontrado ...
    return this.alunosRepository.delete({id});
  }
}