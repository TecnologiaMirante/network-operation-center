import { ConteudoHasAulasRepository } from "../../../repositories/interfaces/conteudos/conteudo-has-aulas-repository";
import { ConteudoHasAtividadesRepository } from "../../../repositories/interfaces/conteudos/conteudo-has-atividades-repository";
import { AtividadesRepository } from "../../../repositories/interfaces/atividades/atividades-repository";
import { ConteudosRepository } from "../../../repositories/interfaces/conteudos/conteudo-repository";

// Interface
interface DeleteManyConteudoHasAtividadesRequest {
  id_conteudo: string;
}

// Service
export class DeleteManyConteudoHasAtividadesService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private conteudoHasAtividadesRepository: ConteudoHasAtividadesRepository
  ) {}

  // Executando o service
  async execute(request: DeleteManyConteudoHasAtividadesRequest) {
    
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
    
    // Apagando as atividades antigas deste conteúdo
    try {
      await this.conteudoHasAtividadesRepository.deleteMany({ id_conteudo });
    } catch (err) {
      return err;
    }

  }
}