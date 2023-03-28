import { AlunoRespondeAtividadesRepository} from "../../../repositories/interfaces/alunos/aluno-responde-atividade";
import { AlunosRepository } from "../../../repositories/interfaces/alunos/alunos-repository";


// Interface
interface GetNotasByDisciplinaAlunoServiceRequest {
  id_aluno: string;
}

// Service
export class GetNotasByDisciplinaAlunoService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private alunosRepository: AlunosRepository,
    private alunoRespondeAtividadesRepository: AlunoRespondeAtividadesRepository,
  ) {}

  // Executando o service
  async execute(request: GetNotasByDisciplinaAlunoServiceRequest) {
    
    // Dados do service
    const { id_aluno } = request;

    // Verificando se o aluno existe
    if(!(await this.alunosRepository.find({id: id_aluno}))){
      return new Error("Aluno inexistente!");
    }

    // Criando ...
    const notas = await this.alunoRespondeAtividadesRepository.findNotas({
      id_aluno,
    })

    // Retornando dado criado para o controller
    return notas;
  }
}