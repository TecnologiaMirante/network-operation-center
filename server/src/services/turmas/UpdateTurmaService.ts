import { shift_turma, status_turma, TurmasRepository } from "../../repositories/interfaces/turmas/turmas-repository";
import { SeriesRepository } from "../../repositories/interfaces/series/series-repository";

// Interface do createTurma
interface UpdateTurmaRequest {
  id: string
  name?: string;
  code?: string;
  shift?: shift_turma;
  year?: string;
  status?: status_turma;
  id_serie?: string;
}

// Service
export class UpdateTurmaService {
  
  // Recebendo o repositório da Turma no construtor
  constructor(
    private turmasRepository: TurmasRepository,
    private seriesRepository: SeriesRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateTurmaRequest) {
    
    // Dados do service
    const { id, name, code, shift, year, status, id_serie } = request;

    if (id_serie) {
      // Verificando se a serie existe
      if(!(await this.seriesRepository.find({id: id_serie}))){
        return new Error("Série inexistente!");
      }
    }

    // Atualizando ...
    const turma = await this.turmasRepository.update({
      id,
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