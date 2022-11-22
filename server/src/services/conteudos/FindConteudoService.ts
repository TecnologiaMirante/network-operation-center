import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";

// Interface
interface FindConteudoRequest {
  id: string;
}

// Service
export class FindConteudoService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
  ) {}

  // Executando o service
  async execute(request: FindConteudoRequest) {
    
    // Dados do service 
    const { id } = request;

    if (!(await this.conteudosRepository.find({ id }))) {
      return new Error("Conteúdo inexistente!");
    }

    // Buscando ...
    const conteudo = await this.conteudosRepository.find({id})

    // Verificando se o conteúdo existe
    if(!conteudo){
      // Se não existir, retorna errro
      return new Error("Conteúdo inexistente");
    }

    // Retornando os dados para o controller
    return conteudo;
  }
}