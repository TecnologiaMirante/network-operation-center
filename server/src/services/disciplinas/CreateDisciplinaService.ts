import { DisciplinasRepository, status_disciplina } from "../../repositories/interfaces/disciplinas/disciplinas-repository";
import { EscolasRepository } from "../../repositories/interfaces/escolas/escolas-repository";

// Interface do createDisciplina
interface CreateDisciplinaRequest {
  name: string;
  code: string;
  status: status_disciplina;
  id_escola: string;
}

// Service
export class CreateDisciplinaService {
  
  // Recebendo o repositório da Disciplina no construtor
  constructor(
    private disciplinasRepository: DisciplinasRepository,
    private escolasRepository: EscolasRepository,
  ) {}

  // Executando o service
  async execute(request: CreateDisciplinaRequest) {
    
    // Dados do service
    const { name, code, status, id_escola } = request;

    // Verificando se a escola existe
    if(!(await this.escolasRepository.find({id: id_escola}))){
      return new Error("Escola inexistente!");
    }

    // Verificar se a disciplina já existe

    // Criando ...
    const disciplina = await this.disciplinasRepository.create({
      name,
      code,
      status,
      id_escola
    })

    return disciplina;
  }
}