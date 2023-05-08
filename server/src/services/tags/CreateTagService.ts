import { TagsRepository } from "../../repositories/interfaces/tags/tags-repository";

// Interface do createTag
interface CreateTagRequest {
  name: string;
}

// Service
export class CreateTagService {
  
  // Recebendo o repositório da tag no construtor
  constructor(
    private tagsRepository: TagsRepository,
  ) {}

  // Executando o service
  async execute(request: CreateTagRequest) {
    
    // Dados do service
    const { name } = request;

    // Verificando se a tag já existe
    if (await this.tagsRepository.findByName({ name })) {
      return new Error("Tag já existente!");
    }

    // Criando a tag ...
    return await this.tagsRepository.create({
      name,
    })
  }
}