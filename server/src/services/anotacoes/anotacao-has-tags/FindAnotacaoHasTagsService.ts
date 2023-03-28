import { AnotacaoHasTagsRepository } from "../../../repositories/interfaces/anotacoes/anotacao-has_tags-repository";

// Interface
interface FindAnotacaoHasTagsRequest {
  id: string;
}

// Service
export class FindAnotacaoHasTagsService {
  
  // Recebendo o repositório no construtor
  constructor( 
    private anotacaoHasTagsRepositoryRepository: AnotacaoHasTagsRepository,
  ) {}

  // Executando o service
  async execute(request: FindAnotacaoHasTagsRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const anotacaoHasTag = await this.anotacaoHasTagsRepositoryRepository.find({
      id,
    })

    return anotacaoHasTag;
  }
}