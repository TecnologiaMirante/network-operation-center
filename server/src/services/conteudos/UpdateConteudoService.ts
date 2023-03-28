import { ConteudosRepository } from "../../repositories/interfaces/conteudos/conteudo-repository";
import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";
import { BimestresRepository } from "../../repositories/interfaces/bimestres/bimestres-repository";

// Interface
interface UpdateConteudoRequest {
  id: string;
  name?:string;
  id_disciplina?: string;
  id_bimestre?: string;
  status: boolean;
}

// Service
export class UpdateConteudoService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private disciplinasRepository: DisciplinasRepository,
    private bimestresRepository: BimestresRepository
  ) {}

  // Executando o service
  async execute(request: UpdateConteudoRequest) {
    
    // Dados do service 
    const { id, name, id_disciplina, id_bimestre, status } = request;

    // Verificando se o conteúdo existe
    if(!(await this.conteudosRepository.find({id}))){
      // Se não existir, retorna errro
      return new Error("Conteúdo inexistente");
    }

    if (id_disciplina) {
      // Verificando se a disciplina existir
      if(!(await this.disciplinasRepository.find({id: id_disciplina}))){
        // Se a disciplina não existir
        return new Error("Disciplina inexistente!");
      }
    }

    if (id_bimestre) {
      // Verificando se o bimestre existir
      if(!(await this.bimestresRepository.find({id: id_bimestre}))){
        // Se o bimestre não existir
        return new Error("Bimestre inexistente!");
      }
    }

    // Criando ...
    return await this.conteudosRepository.update({
      id,
      name,
      id_disciplina,
      id_bimestre,
      status
    })
  }
}