import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { MediasRepository } from "../../repositories/interfaces/medias/medias-repository";

// Interface
interface GetMediasByAlunoRequest {
  id_aluno: string;
}

// Service
export class GetMediasByAlunoService {
  
  // Recebendo o repositório da Media no construtor
  constructor(
    private mediasRepository: MediasRepository,
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: GetMediasByAlunoRequest) {
    
    // Dados do service
    const { id_aluno } = request;

    if (!(await this.alunosRepository.find( {id: id_aluno} ))) {
      return new Error("Aluno inexistente!")
    }

    // Buscando ...
    const medias = await this.mediasRepository.getByAluno({
      id_aluno,
    })

    // Se não existir 
    if (Object.keys(medias).length == 0) {
      return new Error("médias inexistente!");
    }

    return medias;
  }
}