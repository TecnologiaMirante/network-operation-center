import { OpcoesRepository } from "../../repositories/interfaces/opcoes/opcoes-repository";

// Interface
interface FindOpcaoRequest {
  id: string;
}

// Service
export class FindOpcaoService {
  
  // Recebendo o repositório
  constructor(
    private opcoesRepository: OpcoesRepository,
  ) {}

  // Executando o service
  async execute(request: FindOpcaoRequest) {
    
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

    return opcao;
  }
}