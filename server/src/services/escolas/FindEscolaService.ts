import { EscolasRepository } from "../../repositories/interfaces/escolas/escolas-repository";

// Interface do FindEscolas
interface FindEscolaRequest {
  id: string;
}

// Service
export class FindEscolaService {

  // Recebendo o repositório da Escola no construtor
  constructor(
    private escolasRepository: EscolasRepository,
  ) {}

  // Executando o service
  async execute({ id }: FindEscolaRequest) {

    // Buscando a escola
    const Escola = await this.escolasRepository.find({id});
    
    // Se não existir escola
    if (!Escola) {
      return new Error("Escola inexistente!");
    }

    // Se existir, retorna para o controller
    return Escola;
  }
}