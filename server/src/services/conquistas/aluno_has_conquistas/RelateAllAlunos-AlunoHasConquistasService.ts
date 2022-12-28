import { AlunoHasConquistasRepository } from "../../../repositories/interfaces/conquistas/aluno-has-conquistas-repository";
import { ConquistasRepository } from "../../../repositories/interfaces/conquistas/conquistas-repository";

// Interface
interface RelateAllAlunosAlunoHasConquistasRequest {
  id_conquista: string;
}

// Para cada tipo de conquista
// Existe um funcionamento diferente

// Service
export class RelateAllAlunosAlunoHasConquistasService {
  
  // Recebendo o repositório
  constructor(
    private alunoHasConquistasRepository: AlunoHasConquistasRepository,
    private conquistasRepository: ConquistasRepository,
  ) {}

  // Executando o service
  async execute(request: RelateAllAlunosAlunoHasConquistasRequest) {
    
    // Dados do service
    const { id_conquista } = request;

    // Verifica se a conquista existe
    if (!await this.conquistasRepository.find({ id: id_conquista })) {
      return new Error("A conquista não existe");
    }

    // Criando ...
    return await this.alunoHasConquistasRepository.relateAll({
      id_conquista
    })
  }
}