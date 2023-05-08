import { ProgressosRepository } from "../../repositories/interfaces/progressos/progressos-repository";
import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";

// Interface do createProfessor
interface FindProgressoByDataRequest {
  id_aluno: string;
  id_aula: string;
}

// Service
export class FindProgressoByDataService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private progressosRepository: ProgressosRepository,
    private alunosRepository: AlunosRepository,
    private aulasRepository: AulasRepository,
  ) {}

  // Executando o service
  async execute(request: FindProgressoByDataRequest) {
    
    // Dados do service
    const { id_aluno, id_aula } = request;

    try {
      // Verificando se o aluno existe
      if(!(await this.alunosRepository.find({id: id_aluno}))){
        return new Error("Aluno inexistente!");
      }
    } catch (err) {
      return err
    }
    
    try {
      // Verificando se a aula existe
      if(!(await this.aulasRepository.find({id: id_aula}))){
        return new Error("Aula inexistente!");
      }
    } catch (err) {
      return err
    }

    try {
      // Buscando ...
      const progresso = await this.progressosRepository.findByData({
        id_aluno, id_aula,
      })
  
      return progresso;
    } catch (err) {
      return err
    }
  }
}