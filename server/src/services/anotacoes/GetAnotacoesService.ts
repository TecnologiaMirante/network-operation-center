import { AnotacoesRepository } from "../../repositories/interfaces/anotacoes/anotacoes-repository";

// Service
export class GetAnotacoesService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private anotacoesRepository: AnotacoesRepository,
  ) {}

  // Executando o service
  async execute() {
    
    const anotacoes = await this.anotacoesRepository.get();

    // Verificando se a aula existe
    if(Object.values(anotacoes).length == 0){
      return new Error("Nenhuma anotação existente!");
    }

    return anotacoes;
  }
}