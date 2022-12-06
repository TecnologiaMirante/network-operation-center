import { AtividadesRepository } from "../../repositories/interfaces/atividades/atividades-repository";
import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";

// Interface
interface UpdateAtividadeRequest {
  id: string;
  title?: string;
  thumb?: string;
  id_serie?: string,
  id_disciplina?: string
}

// Service
export class UpdateAtividadeService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
    private conteudosRepository: ConteudosRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateAtividadeRequest) {
    
    // Dados do service
    const { id, title, thumb } = request;

    // Se não existir secretaria
    if (!(await this.atividadesRepository.find({id}))) {
      return new Error("Atividade inexistente!");
    }

    // Atualizando ...
    const atividade = await this.atividadesRepository.update({
      id,
      title,
      thumb
    })

    return atividade;
  }
}