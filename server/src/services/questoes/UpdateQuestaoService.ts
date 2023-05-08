import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";
import { questao_difficulty, QuestoesRepository } from "../../repositories/interfaces/questoes/questoes-repository";

// Interface
interface UpdateQuestaoRequest {
  id: string;
  title?: string;
  question_type?: string;
  grade?: number;
  difficulty?: questao_difficulty;
  id_disciplina?: string;
}

// Service
export class UpdateQuestaoService {
  
  // Recebendo o repositório
  constructor(
    private questoesRepository: QuestoesRepository,
    private disciplinasRepository: DisciplinasRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateQuestaoRequest) {
    

    // Dados do service
    const { id, title, question_type, grade, difficulty, id_disciplina } = request;

    // Se inserir disciplina
    if (id_disciplina) {
      if (!(await this.disciplinasRepository.find({ id: id_disciplina }))) {
        return new Error("Por favor, insira os campos obrigatórios!");
      }
    }

    // Criando ...
    return await this.questoesRepository.update({
      id,
      title,
      question_type,
      grade, 
      difficulty, 
      id_disciplina
    })
  }
}