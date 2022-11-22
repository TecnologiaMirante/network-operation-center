import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { AnotacoesRepository } from "../../repositories/interfaces/anotacoes/anotacoes-repository";
import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";

// Interface
interface UpdateAnotacaoRequest {
  id: string;
  descricao: string;
  id_aluno: string;
  id_aula?: string;
}

// Service
export class UpdateAnotacaoService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private anotacoesRepository: AnotacoesRepository,
    private alunosRepository: AlunosRepository,
    private aulasRepository: AulasRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateAnotacaoRequest) {
    
    // Dados do service
    const { id, descricao, id_aluno, id_aula } = request;

    // Verificando se a anotação existe
    if (!(await this.anotacoesRepository.find({id}))) {
      return new Error("Anotação inexistente!");
    }

    // Verificando se o aluno existe
    if(!(await this.alunosRepository.find({id: id_aluno}))){
      return new Error("Aluno inexistente!");
    }

    if (id_aula) {
      // Verificando se a aula existe
      if(!(await this.aulasRepository.find({id: id_aula}))){
        return new Error("Aula inexistente!");
      }
    }

    try {
      // Atualizando ...
      const anotacao = await this.anotacoesRepository.update({
        id,
        id_aluno,
        id_aula,
        descricao
      })

      return anotacao;
    } catch (err) {
      return err;
    }

  }
}