import { ProgressosRepository } from "../../repositories/interfaces/progressos/progressos-repository";
import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";
import { BimestresRepository } from "../../repositories/interfaces/bimestres/bimestres-repository";

// Interface do createProfessor
interface UpdateProgressoRequest {
  id: string;
  id_aluno?: string;
  id_aula?: string;
  progress?: number;
  id_bimestre: string;
}

// Service
export class UpdateProgressoService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private progressosRepository: ProgressosRepository,
    private alunosRepository: AlunosRepository,
    private aulasRepository: AulasRepository,
    private bimestresRepository: BimestresRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateProgressoRequest) {
    
    // Dados do service
    const { id, id_aluno, id_aula, progress, id_bimestre } = request;

    if (id_aluno) {
      try {
        // Verificando se o aluno existe
        if(!(await this.alunosRepository.find({id: id_aluno}))){
          return new Error("Aluno inexistente!");
        }
      } catch (err) {
        return err
      }
    }
    
    if (id_aula) {
      try {
        // Verificando se a aula existe
        if(!(await this.aulasRepository.find({id: id_aula}))){
          return new Error("Aula inexistente!");
        }
      } catch (err) {
        return err
      }
    }

    if (id_bimestre) {
      try {
        // Verificando se o bimestre existe
        if(!(await this.bimestresRepository.find({id: id_bimestre}))){
          return new Error("Bimestre inexistente!");
        }
      } catch (err) {
        return err
      }
    }

    try {
      // Criando ...
      const progresso = await this.progressosRepository.update({
          id,
          id_aluno, 
          id_aula, 
          progress,
          id_bimestre
      })
  
      return progresso;
    } catch (err) {
      return err
    }
  }
}