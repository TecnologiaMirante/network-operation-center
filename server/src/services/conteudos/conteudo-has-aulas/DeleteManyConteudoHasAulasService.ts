import { ConteudoHasAulasRepository } from "../../../repositories/interfaces/conteudos/conteudo-has-aulas-repository";
import { AtividadesRepository } from "../../../repositories/interfaces/atividades/atividades-repository";
import { ConteudosRepository } from "../../../repositories/interfaces/conteudos/conteudo-repository";

// Interface
interface DeleteManyConteudoHasAulasRequest {
  id_conteudo: string;
}

// Service
export class DeleteManyConteudoHasAulasService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private conteudoHasAulasRepository: ConteudoHasAulasRepository
  ) {}

  // Executando o service
  async execute(request: DeleteManyConteudoHasAulasRequest) {
    
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
    
    // Apagando as aulas antigas deste conteúdo
    try {
      await this.conteudoHasAulasRepository.deleteMany({ id_conteudo });
    } catch (err) {
      return err;
    }

  }
}