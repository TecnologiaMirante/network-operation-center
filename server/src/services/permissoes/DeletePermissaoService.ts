import { PermissoesRepository } from "../../repositories/interfaces/permissoes/permissoes-repository";

// Interface do DeletePermissao
interface DeletePermissaoServiceRequest {
  id: string;
}

// Service
export class DeletePermissaoService {
  
  // Recebendo o repositório da Permissao no construtor
  constructor(
    private permissoesRepository: PermissoesRepository,
  ) {}

  // Executando o service
  async execute({ id }: DeletePermissaoServiceRequest) {
    
    // Buscando a Permissao
    const permissao = await this.permissoesRepository.find({id});

    // Se não existir Permissao
    if (!permissao) {
      return new Error("Permissão inexistente!");
    }

    // Se existir
    return await this.permissoesRepository.delete({id});
  }
}