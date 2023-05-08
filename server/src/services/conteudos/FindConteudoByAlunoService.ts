import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";

// Interface
interface FindConteudoRequest {
  id: string;
  id_aluno: string;
}

// Service
export class FindConteudoByAlunoService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: FindConteudoRequest) {
    
    // Dados do service 
    const { id, id_aluno } = request;

    if (!(await this.alunosRepository.find({ id: id_aluno }))) {
      return new Error("Aluno inexistente!");
    }

    if (!(await this.conteudosRepository.find({ id }))) {
      return new Error("Conteúdo inexistente!");
    }

    // Buscando ...
    const conteudo = await this.conteudosRepository.findByAluno({id, id_aluno});

    // Verificando se o conteúdo existe
    if(!conteudo){
      // Se não existir, retorna errro
      return new Error("Conteúdo inexistente");
    }

    // Retornando os dados para o controller
    return conteudo;
  }
}