import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";

// Interface
interface CreateAulaRequest {
  hash: string;
  title: string;
  file: string;
  thumb?: string;
  time: string;
  id_serie: string;
  id_disciplina?: string;
}

// Service
export class CreateAulaService {
  
  // Recebendo os repositórios no construtor
  constructor(
    private aulasRepository: AulasRepository,
    private disciplinasRepository: DisciplinasRepository
  ) {}

  // Executando o service
  async execute(request: CreateAulaRequest) {
    
    // Dados do service
    const { hash, title, file, thumb, time, id_serie, id_disciplina } = request;

    if (id_disciplina) {
      // Verificando se a disciplina existe
      if(!(await this.disciplinasRepository.find({id: id_disciplina}))){
        return new Error("Disciplina inexistente!");
      }
    }

    try {
      // Criando ...
      const aula = await this.aulasRepository.create({
        hash, 
        title, 
        file, 
        thumb,
        time, 
        id_serie, 
        id_disciplina
      })

      return aula;

    } catch (err) {
      return new Error("Erro durante a criação da aula!");
    }
  }
}