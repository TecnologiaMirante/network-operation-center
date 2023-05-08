import { AtividadesRepository } from "../../repositories/interfaces/atividades/atividades-repository";

// Interface
interface DeleteAtividadeRequest {
  id: string;
}

// Service
export class DeleteAtividadeService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteAtividadeRequest) {
    
    // Dados do service
    const { id } = request;

    // Criando ...
    const atividade = await this.atividadesRepository.find({
      id,
    })

    // Se não existir 
    if (!atividade) {
      return new Error("Atividade inexistente!");
    }

    return this.atividadesRepository.delete({id});
  }
}