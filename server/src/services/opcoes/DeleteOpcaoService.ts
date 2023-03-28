import { OpcoesRepository } from "../../repositories/interfaces/opcoes/opcoes-repository";

// Interface
interface DeleteOpcaoRequest {
  id: string;
}

// Service
export class DeleteOpcaoService {
  
  // Recebendo o repositório
  constructor(
    private opcoesRepository: OpcoesRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteOpcaoRequest) {
    
    // Dados do service 
    const { id } = request;

    // Buscando ...
    const opcao = await this.opcoesRepository.find({
      id,
    })

    // Se não existir opcao
    if (!opcao) {
      return new Error("Opção inexistente!");
    }

    return this.opcoesRepository.delete({id});
  }
}