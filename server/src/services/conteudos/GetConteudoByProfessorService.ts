import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";

// Interface
interface GetConteudoByProfessorRequest {
  id: string;
}

// Service
export class GetConteudoByProfessorService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private professoresRepository: ProfessoresRepository,
  ) {}

  // Executando o service
  async execute(request: GetConteudoByProfessorRequest) {
    
    // Dados do service 
    const { id } = request;

    if (!(await this.professoresRepository.find({ id }))) {
      return new Error("Professor inexistente!");
    }

    // Buscando ...
    const conteudos = await this.conteudosRepository.getByProfessor({ created_by: id})

    // Verificando se o conteúdo existe
    if(Object(conteudos).length == 0){
      // Se não existir, retorna erro
      return new Error("Nenhum conteúdo cadastrado!");
    }

    // Retornando os dados para o controller
    return conteudos;
  }
}