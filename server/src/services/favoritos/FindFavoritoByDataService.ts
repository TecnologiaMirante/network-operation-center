import { FavoritosRepository} from "../../repositories/interfaces/favoritos/favoritos";
import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";

// Interface
interface FindFavoritoByDataRequest {
  id_aluno: string;
  id_aula: string;
}

// Service
export class FindFavoritoByDataService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private favoritosRepository: FavoritosRepository,
    private alunosRepository: AlunosRepository,
    private aulasRepository: AulasRepository,
  ) {}

  // Executando o service
  async execute(request: FindFavoritoByDataRequest) {
    
    // Dados do service
    const { id_aluno, id_aula } = request;

    if (!(await this.alunosRepository.find({ id: id_aluno }))) {
      return new Error ("Aluno inexistente!")
    }

    if (!(await this.aulasRepository.find({ id: id_aula }))) {
      return new Error ("Aula inexistente!")
    }

    const data = await(this.favoritosRepository.findByData({ id_aluno, id_aula }));

    if (!data) {
      return new Error("Registro inexistente!");
    }

    // Retornando dado encontrado para o controller
    return data;
  }
}