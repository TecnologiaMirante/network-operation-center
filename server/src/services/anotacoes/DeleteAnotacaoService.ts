import { AnotacoesRepository } from "../../repositories/interfaces/anotacoes/anotacoes-repository";

// Interface
interface DeleteAnotacaoRequest {
  id: string;
}

// Service
export class DeleteAnotacaoService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private anotacoesRepository: AnotacoesRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteAnotacaoRequest) {
    
    // Dados do service
    const { id } = request;

    const anotacao = await this.anotacoesRepository.find({id});

    // Verificando se a aula existe
    if(!(anotacao)){
      return new Error("Anotacação inexistente!");
    }

    return this.anotacoesRepository.delete({id});
  }
}