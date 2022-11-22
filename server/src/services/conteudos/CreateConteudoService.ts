import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";
import { BimestresRepository } from "../../repositories/interfaces/bimestres/bimestres-repository";

// Interface
interface CreateConteudoRequest {
  name:string;
  id_disciplina: string;
  id_bimestre: string;
  created_by: string;
  status?: boolean;
}

// Service
export class CreateConteudoService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private disciplinasRepository: DisciplinasRepository,
    private bimestresRepository: BimestresRepository
  ) {}

  // Executando o service
  async execute(request: CreateConteudoRequest) {
    
    // Dados do service 
    const { name, id_disciplina, id_bimestre, created_by, status } = request;

    // Verificando se a disciplina existir
    if(!(await this.disciplinasRepository.find({id: id_disciplina}))){
      // Se a disciplina não existir
      return new Error("Disciplina inexistente!");
    }

    // Verificando se a Bimestre existir
    if(!(await this.bimestresRepository.find({id: id_bimestre}))){
      // Se o Bimestre não existir
      return new Error("Bimestre inexistente!");
    }

    // Criando ...
    return await this.conteudosRepository.create({
      name,
      id_disciplina,
      id_bimestre,
      created_by,
      status
    })
  }
}