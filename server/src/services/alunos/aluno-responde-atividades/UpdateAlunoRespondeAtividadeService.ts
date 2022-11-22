import { AlunoRespondeAtividadesRepository} from "../../../repositories/interfaces/alunos/aluno-responde-atividade";
import { AlunosRepository } from "../../../repositories/interfaces/alunos/alunos-repository";
import { AtividadesRepository } from "../../../repositories/interfaces/atividades/atividades-repository";

// Interface
interface UpdateAlunoRequest {
  id: string;
  nota?: number;
  id_atividade?: string;
  id_aluno?: string;
}

// Service
export class UpdateAlunoRespondeAtividadeService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private alunoRespondeAtividadesRepository: AlunoRespondeAtividadesRepository,
    private alunosRepository: AlunosRepository,
    private atividadesRepository: AtividadesRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateAlunoRequest) {
    
    // Dados do service
    const { id, nota, id_aluno, id_atividade } = request;

    if(!(await this.alunoRespondeAtividadesRepository.find({id}))){
      return new Error("Registro inexistente!");
    }

    if (id_aluno) {
      // Verificando se o aluno existe
      if(!(await this.alunosRepository.find({id: id_aluno}))){
        return new Error("Aluno inexistente!");
      }
    }

    if (id_atividade) {
      // Verificando se a atividade existe
      if(!(await this.atividadesRepository.find({id: id_atividade}))){
        return new Error("Atividade inexistente!");
      }
    }

    // Atualizando ...
    const alunoRespondeAtv = await this.alunoRespondeAtividadesRepository.update({
      id,
      nota,
      id_aluno,
      id_atividade
    })

    // Retornando dado atualizado para o controller
    return alunoRespondeAtv;
  }
}