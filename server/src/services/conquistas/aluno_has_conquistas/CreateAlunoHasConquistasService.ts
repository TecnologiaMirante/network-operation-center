import { AlunosRepository } from "../../../repositories/interfaces/alunos/alunos-repository";
import { AlunoHasConquistasRepository } from "../../../repositories/interfaces/conquistas/aluno-has-conquistas-repository";
import { ConquistasRepository } from "../../../repositories/interfaces/conquistas/conquistas-repository";

// Interface
interface AlunoHasConquistasRequest {
  progress: number;
  id_aluno: string;
  id_conquista: string;
}

// Para cada tipo de conquista
// Existe um funcionamento diferente


// Service
export class CreateAlunoHasConquistasService {
  
  // Recebendo o repositório
  constructor(
    private alunoHasConquistasRepository: AlunoHasConquistasRepository,
    private alunosRepository: AlunosRepository,
    private conquistasRepository: ConquistasRepository,
  ) {}

  // Executando o service
  async execute(request: AlunoHasConquistasRequest) {
    
    // Dados do service
    const { progress, id_aluno, id_conquista } = request;

    // Verifica se existe o aluno
    if (!(await this.alunosRepository.find({ id: id_aluno }))) {
      return new Error("O aluno não existe");
    }

    // Verifica se a conquista existe
    if (!await this.conquistasRepository.find({ id: id_conquista })) {
      return new Error("A conquista não existe");
    }

    // Criando ...
    return await this.alunoHasConquistasRepository.create({
      progress, 
      id_aluno, 
      id_conquista
    })
  }
}