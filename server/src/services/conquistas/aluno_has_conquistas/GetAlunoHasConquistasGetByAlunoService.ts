import { AlunosRepository } from "../../../repositories/interfaces/alunos/alunos-repository";
import { AlunoHasConquistasRepository } from "../../../repositories/interfaces/conquistas/aluno-has-conquistas-repository";

// Interface
interface AlunoHasConquistasByAlunoRequest {
  id_aluno: string;
}

// Service
export class GetAlunoHasConquistasByAlunoService {
  
  // Recebendo o repositório
  constructor(
    private alunoHasConquistasRepository: AlunoHasConquistasRepository,
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: AlunoHasConquistasByAlunoRequest) {
    
    // Dados do service
    const { id_aluno } = request;

    // Verifica se existe o aluno
    if (!(await this.alunosRepository.find({ id: id_aluno }))) {
      return new Error("O aluno não existe");
    }


    // Criando ...
    return await this.alunoHasConquistasRepository.getConquistasByAluno({
      id_aluno, 
    })
  }
}