import { ConteudoHasItensRepository } from "../../../repositories/interfaces/conteudos/conteudo-has-itens-repository";
import { ConteudosRepository } from "../../../repositories/interfaces/conteudos/conteudo-repository";

// Interface
interface DeleteManyConteudoHasItensRequest {
  id_conteudo: string;
}

// Service
export class DeleteManyConteudoHasItensService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private conteudoHasItensRepository: ConteudoHasItensRepository
  ) {}

  // Executando o service
  async execute(request: DeleteManyConteudoHasItensRequest) {
    
    // Dados do service 
    const { id_conteudo } = request;

    try {
      // Verifica se o conteúdo existe
      if (!(await this.conteudosRepository.find({ id: id_conteudo }))) {
        return new Error("Conteúdo inexistente!");
      }
    } catch (err) {
      return err;
    }
    
    // Apagando os itens antigos deste conteúdo
    try {
      await this.conteudoHasItensRepository.deleteMany({ id_conteudo });
    } catch (err) {
      return err;
    }
  }
}