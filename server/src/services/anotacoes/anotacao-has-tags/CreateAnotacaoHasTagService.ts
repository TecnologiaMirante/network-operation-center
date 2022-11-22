import { AnotacaoHasTagsRepository } from "../../../repositories/interfaces/anotacoes/anotacao-has_tags-repository";
import { AnotacoesRepository } from "../../../repositories/interfaces/anotacoes/anotacoes-repository";
import { TagsRepository } from "../../../repositories/interfaces/tags/tags-repository";

// Interface
interface CreateAnotacaoHasTagRequest {
  id_anotacao: string;
  id_tag: string;
}

// Service
export class CreateAnotacaoHasTagService {
  
  // Recebendo o repositório no construtor
  constructor( 
    private anotacaoHasTagsRepositoryRepository: AnotacaoHasTagsRepository,
    private anotacoesRepository: AnotacoesRepository,
    private tagsRepository: TagsRepository,
  ) {}

  // Executando o service
  async execute(request: CreateAnotacaoHasTagRequest) {
    
    // Dados do service
    const { id_anotacao, id_tag } = request;

    // Verificando se a anotação existe
    if(!(await this.anotacoesRepository.find({id: id_anotacao}))){
      return new Error("Anotação inexistente!");
    }

    // Verificando se a tag existe
    if(!(await this.tagsRepository.find({id: id_tag}))){
      return new Error("Tag inexistente!");
    }

    // Criando ...
    const anotacaoHasTag = await this.anotacaoHasTagsRepositoryRepository.create({
      id_anotacao,
      id_tag
    })

    return anotacaoHasTag;
  }
}