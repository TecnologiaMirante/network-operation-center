import { FavoritosRepository} from "../../repositories/interfaces/favoritos/favoritos";
import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";

// Interface
interface GetFavoritosByAlunoRequest {
  id_aluno: string;
}

// Service
export class GetFavoritosByAlunoService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private favoritosRepository: FavoritosRepository,
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute(request: GetFavoritosByAlunoRequest) {
    
    // Dados do service
    const { id_aluno } = request;

    if (!(await this.alunosRepository.find({ id: id_aluno }))) {
      return new Error("Aluno não registrado!");
    }

    const data = await(this.favoritosRepository.findByAluno({id_aluno}));

    if (!data) {
      return new Error("Registro inexistente!");
    }

    // Retornando dado encontrado para o controller
    return data;
  }
}