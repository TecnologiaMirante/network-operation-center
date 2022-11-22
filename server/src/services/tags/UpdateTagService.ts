import { TagsRepository } from "../../repositories/interfaces/tags/tags-repository";

// Interface do updateTag
interface UpdateTagRequest {
  id:string;
  name?: string;
}

// Service
export class UpdateTagService {
  
  // Recebendo o repositório da tag no construtor
  constructor(
    private tagsRepository: TagsRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateTagRequest) {
    
    // Dados do service
    const { id, name } = request;

    // Se o usuário não inserir nome
    if (!(await this.tagsRepository.find({id}))) {
      return new Error("Tag inexistente!");
    }

    // Criando a tag ...
    await this.tagsRepository.update({
      id,
      name,
    })
  }
}