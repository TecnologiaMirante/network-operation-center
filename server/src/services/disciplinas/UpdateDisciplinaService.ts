import { DisciplinasRepository, status_disciplina } from "../../repositories/interfaces/disciplinas/disciplinas-repository";
import { EscolasRepository } from "../../repositories/interfaces/escolas/escolas-repository";

// Interface do createDisciplina
interface UpdateDisciplinaRequest {
  id: string;
  name?: string;
  code?: string;
  status: status_disciplina;
  id_escola?: string;
  icon?: string;
  bk_img?: string;
  bk_color?: string;
}

// Service
export class UpdateDisciplinaService {
  
  // Recebendo o repositório da Disciplina no construtor
  constructor(
    private disciplinasRepository: DisciplinasRepository,
    private escolasRepository: EscolasRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateDisciplinaRequest) {
    
    // Dados do service
    const { id, name, code, status, id_escola, icon, bk_img, bk_color } = request;

    if (!(await this.disciplinasRepository.find({id}))) {
      return new Error("Disciplina inexistente!");
    }
    
    if (id_escola) {
      // Verificando se a escola existe
      if(!(await this.escolasRepository.find({id: id_escola}))){
        return new Error("Escola inexistente!");
      }
    }

    // Atualizando ...
    const disciplina = await this.disciplinasRepository.update({
      id,
      name,
      code,
      status,
      id_escola,
      icon,
      bk_img,
      bk_color
    })

    return disciplina;
  }
}