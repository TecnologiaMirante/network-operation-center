import { AnotacoesRepository } from "../../repositories/interfaces/anotacoes/anotacoes-repository";

// Interface
interface GetAnotacoesByAlunoRequest {
  id_aluno: string;
}

// Service
export class GetAnotacoesByAlunoService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private anotacoesRepository: AnotacoesRepository,
  ) {}

  // Executando o service
  async execute(request: GetAnotacoesByAlunoRequest) {
    
    // Dados do service
    const { id_aluno } = request;

    const anotacoes = await this.anotacoesRepository.getByAluno({ id_aluno });

    // Verificando se a aula existe
    if(Object.keys(anotacoes).length == 0){
      return new Error("Nenhuma anotação existente!");
    }

    return anotacoes;
  }
}