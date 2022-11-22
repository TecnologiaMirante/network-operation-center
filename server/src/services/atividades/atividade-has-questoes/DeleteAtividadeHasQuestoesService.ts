import { AtividadeHasQuestoesRepository } from "../../../repositories/interfaces/atividades/atividade-has-questoes-repository";

// Interface
interface DeleteAtividadeHasQuestoesRequest {
  id: string;
}

// Service
export class DeleteAtividadeHasQuestoesService {
  
  // Recebendo o repositório no construtor
  constructor(
    private atividadeHasQuestoesRepository: AtividadeHasQuestoesRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteAtividadeHasQuestoesRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const atividade = await this.atividadeHasQuestoesRepository.find({
      id,
    })

    // Se não existir
    if (!atividade) {
      return new Error("Registro inexistente!");
    }

    return this.atividadeHasQuestoesRepository.delete({id});
  }
}