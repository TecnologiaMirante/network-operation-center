import { DisciplinasRepository } from "../../repositories/interfaces/disciplinas/disciplinas-repository";

// Service
export class GetDisciplinasService {
  
  // Recebendo o repositório da Disciplina no construtor
  constructor(
    private disciplinasRepository: DisciplinasRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando ...
    const disciplinas = await this.disciplinasRepository.get();

    // Se não existir 
    if (Object.keys(disciplinas).length == 0) {
      return new Error("Nenhuma disciplina cadastrada!");
    }

    // Se der tudo certo, retorna para o controller os dados encontrados
    return disciplinas;
  }
}