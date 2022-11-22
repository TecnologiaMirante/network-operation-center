import { TagsRepository } from "../../repositories/interfaces/tags/tags-repository";

// Interface do updateTag
interface FindTagRequest {
  id:string;
}

// Service
export class FindTagService {
  
  // Recebendo o repositório da tag no construtor
  constructor(
    private tagsRepository: TagsRepository,
  ) {}

  // Executando o service
  async execute(request: FindTagRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando ...
    const tag = await this.tagsRepository.find({
      id,
    })

    // Se não existir tag
    if (!tag) {
      return new Error("Tag inexistente!");
    }

    return tag;
  }
}