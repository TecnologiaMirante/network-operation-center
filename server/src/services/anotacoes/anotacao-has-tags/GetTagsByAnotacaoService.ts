import { AnotacaoHasTagsRepository } from "../../../repositories/interfaces/anotacoes/anotacao-has_tags-repository";

// Interface
interface GetTagsByAnotacaoRequest {
  id_anotacao: string;
}

// Service
export class GetTagsByAnotacaoService {
  
  // Recebendo o repositório no construtor
  constructor( 
    private anotacaoHasTagsRepository: AnotacaoHasTagsRepository,
  ) {}

  // Executando o service
  async execute(request: GetTagsByAnotacaoRequest) {
    
    // Dados do service
    const { id_anotacao } = request;

    // Buscando ...
    const anotacaoHasTag = await this.anotacaoHasTagsRepository.getTagsByAnotacao({
      id_anotacao,
    })

    return anotacaoHasTag;
  }
}