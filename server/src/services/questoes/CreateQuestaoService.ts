import { questao_difficulty, QuestoesRepository } from "../../repositories/interfaces/questoes/questoes-repository";

// Interface
interface CreateQuestaoRequest {
  title: string;
  question_type: string;
  grade: number;
  difficulty: questao_difficulty;
  id_disciplina: string;
}

// Service
export class CreateQuestaoService {
  
  // Recebendo o repositório
  constructor(
    private questoesRepository: QuestoesRepository,
  ) {}

  // Executando o service
  async execute(request: CreateQuestaoRequest) {
    
    // Dados do service
    const { title, question_type, grade, difficulty, id_disciplina } = request;

    // Se o usuário não inserir os dados
    if (!title && !question_type) {
      return new Error("Por favor, insira os campos obrigatórios!");
    }

    // Criando ...
    return await this.questoesRepository.create({
      title,
      question_type,
      grade, 
      difficulty, 
      id_disciplina
    })
  }
}