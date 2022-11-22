import { TurmasRepository, shift_turma, status_turma } from "../../repositories/interfaces/turmas/turmas-repository";
import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";

// Interface do createTurma
interface CreateTurmaRequest {
  name: string;
  code: string;
  shift: shift_turma;
  year: string;
  status: status_turma;
  id_serie: string;
}

// Service
export class CreateTurmaService {
  
  // Recebendo o repositório da Turma no construtor
  constructor(
    private turmasRepository: TurmasRepository,
    private seriesRepository: SeriesRepository,
  ) {}

  // Executando o service
  async execute(request: CreateTurmaRequest) {
    
    // Dados do service
    const { name, code, shift, year, status, id_serie } = request;

    // Verificando se a serie existe
    if(!(await this.seriesRepository.find({id: id_serie}))){
      return new Error("Série inexistente!");
    }

    // Criando ...
    const turma = await this.turmasRepository.create({
      name,
      code,
      shift,
      year,
      status,
      id_serie
    })

    return turma;
  }
}