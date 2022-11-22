import { LembretesRepository } from "../../repositories/interfaces/lembretes/lembretes-repository";

// Service
export class GetLembretesService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private lembretesRepository: LembretesRepository,
  ) {}

  // Executando o service
  async execute() {
    
    const lembretes = await this.lembretesRepository.get()

    if (Object.keys(lembretes).length == 0) {
      return new Error("Sem lembretes existentes!")
    }
    return lembretes;
  }
}