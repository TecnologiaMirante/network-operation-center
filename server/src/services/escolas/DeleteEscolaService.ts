import { EscolasRepository } from "../../repositories/interfaces/escolas/escolas-repository";

// Interface do deleteEscola
interface DeleteEscolaRequest {
  id: string;
}

// Service
export class DeleteEscolaService {

  // Recebendo o repositório da Escola no construtor
  constructor(
    private escolasRepository: EscolasRepository,
  ) {}

  async execute({ id }: DeleteEscolaRequest) {

    // Buscando a Escola
    const Escola = await this.escolasRepository.find({id});
    
    // Se não existir Escola
    if (!Escola) {
      return new Error("Escola inexistente!");
    }

    // Se existir
    return await this.escolasRepository.delete({id});
  }
}