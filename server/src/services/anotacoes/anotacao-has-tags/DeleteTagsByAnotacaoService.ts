import { AnotacaoHasTagsRepository } from "../../../repositories/interfaces/anotacoes/anotacao-has_tags-repository";

// Interface
interface DeleteTagsByAnotacaoRequest {
  id_anotacao: string;
}

// Service
export class DeleteTagsByAnotacaoService {
  
  // Recebendo o repositório no construtor
  constructor( 
    private anotacaoHasTagsRepositoryRepository: AnotacaoHasTagsRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteTagsByAnotacaoRequest) {
    
    // Dados do service
    const { id_anotacao } = request;

    // Buscando ...
    const anotacaoHasTag = await this.anotacaoHasTagsRepositoryRepository.deleteAllTagsByAnotacao({
      id_anotacao,
    })

    return anotacaoHasTag;
  }
}