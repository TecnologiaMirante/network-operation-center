import { TagsRepository } from "../../repositories/interfaces/tags/tags-repository";

// Interface do updateTag
interface FindTagByNameRequest {
  name:string;
}

// Service
export class FindTagByNameService {
  
  // Recebendo o repositório da tag no construtor
  constructor(
    private tagsRepository: TagsRepository,
  ) {}

  // Executando o service
  async execute(request: FindTagByNameRequest) {
    
    // Dados do service
    const { name } = request;

    // Buscando ...
    const tag = await this.tagsRepository.findByName({
      name,
    })

    return tag;
  }
}