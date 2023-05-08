import { AlunoRespondeAtividadesRepository} from "../../../repositories/interfaces/alunos/aluno-responde-atividade";
import { AlunosRepository } from "../../../repositories/interfaces/alunos/alunos-repository";
import { AtividadesRepository } from "../../../repositories/interfaces/atividades/atividades-repository";
import { BimestresRepository } from "../../../repositories/interfaces/bimestres/bimestres-repository";

// Interface
interface CreateAlunoRespondeAtividadeRequest {
  nota: number;
  time: number;
  id_atividade: string;
  id_aluno: string;
}

// Service
export class CreateAlunoRespondeAtividadeService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private alunoRespondeAtividadesRepository: AlunoRespondeAtividadesRepository,
    private alunosRepository: AlunosRepository,
    private atividadesRepository: AtividadesRepository,
    private bimestresRepository: BimestresRepository,
  ) {}

  // Executando o service
  async execute(request: CreateAlunoRespondeAtividadeRequest) {
    
    // Dados do service
    const { nota, time, id_aluno, id_atividade } = request;

    // Verificando se o aluno existe
    if(!(await this.alunosRepository.find({id: id_aluno}))){
      return new Error("Aluno inexistente!");
    }

    // Verificando se a atividade existe
    if(!(await this.atividadesRepository.find({id: id_atividade}))){
      return new Error("Atividade inexistente!");
    }

    // Criando ...
    const alunoRespondeAtv = await this.alunoRespondeAtividadesRepository.create({
      nota,
      time,
      id_aluno,
      id_atividade,
    })

    // Retornando dado criado para o controller
    return alunoRespondeAtv;
  }
}