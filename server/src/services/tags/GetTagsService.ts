import { TagsRepository } from "../../repositories/interfaces/tags/tags-repository";

// Service
export class GetTagsService {
  
  // Recebendo o repositório da tag no construtor
  constructor(
    private tagsRepository: TagsRepository,
  ) {}

  // Executando o service
  async execute() {
    
    // Buscando ...
    const tags = await this.tagsRepository.get();

    // Caso não existam tags no sistema, retorna erro
    if (Object.keys(tags).length == 0) {
      return new Error("Nenhuma tag cadastrada!")
    } 

    return tags;
  }
}