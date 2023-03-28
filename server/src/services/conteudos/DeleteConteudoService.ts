import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";

// Interface
interface DeleteConteudoRequest {
  id: string;
}

// Service
export class DeleteConteudoService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteConteudoRequest) {
    
    // Dados do service 
    const { id } = request;

    // Buscando ...
    const conteudo = await this.conteudosRepository.find({id})

    // Verificando se o conteúdo existe
    if(!conteudo){
      // Se não existir, retorna errro
      return new Error("Conteúdo inexistente");
    }

    // Retornando os dados para o controller
    return this.conteudosRepository.delete({id});
  }
}