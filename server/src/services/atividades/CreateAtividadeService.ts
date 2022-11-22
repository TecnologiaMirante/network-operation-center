import { AtividadesRepository } from "../../repositories/interfaces/atividades/atividades-repository";
import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";

// Interface
interface CreateAtividadeRequest {
  title: string;
  thumb: string;
  id_serie: string;
  id_disciplina: string;
}

// Service
export class CreateAtividadeService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
    private conteudosRepository: ConteudosRepository,
  ) {}

  // Executando o service
  async execute(request: CreateAtividadeRequest) {
    
    // Dados do service
    const { title, thumb, id_serie, id_disciplina } = request;

    // Criando ...
    const atividade = await this.atividadesRepository.create({
      title,
      thumb,
      id_serie,
      id_disciplina
    })

    return atividade;
  }
}