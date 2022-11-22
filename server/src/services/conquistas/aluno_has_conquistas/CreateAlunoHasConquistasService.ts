import { AlunoHasConquistasRepository } from "../../../repositories/interfaces/conquistas/aluno-has-conquistas-repository";

// Interface
interface AlunoHasConquistasRequest {
  name: string;
  progress: string;
  id_aluno: string;
  id_conquista: string;
}

// Para cada tipo de conquista
// Existe um funcionamento diferente


// Service
export class AlunoHasConquistasService {
  
  // Recebendo o repositório
  constructor(
    private alunoHasConquistasRepository: AlunoHasConquistasRepository,
  ) {}

  // Executando o service
  async execute(request: AlunoHasConquistasRequest) {
    
    // Dados do service
    const { name, progress, id_aluno, id_conquista } = request;

    // Criando ...
    return await this.alunoHasConquistasRepository.create({
      name, 
      progress, 
      id_aluno, 
      id_conquista
    })
  }
}