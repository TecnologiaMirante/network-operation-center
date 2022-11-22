import { PermissoesRepository } from "../../repositories/interfaces/permissoes/permissoes-repository";

// Interface do findPermissao
interface FindPermissaoServiceRequest {
  id: string;
}

// Service
export class FindPermissaoService {
  
  // Recebendo o repositório da Permissao no construtor
  constructor(
    private permissoesRepository: PermissoesRepository,
  ) {}

  // Executando o service
  async execute({ id }: FindPermissaoServiceRequest) {
    
    // Buscando a Permissao
    const permissao = await this.permissoesRepository.find({id});

    // Se não existir Permissao
    if (!permissao) {
      return new Error("Permissão inexistente!");
    }

    // Retornando a Permissao encontrada ...
    return permissao;
  }
}