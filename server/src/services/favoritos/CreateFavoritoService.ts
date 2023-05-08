import { FavoritosRepository} from "../../repositories/interfaces/favoritos/favoritos";
import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { AulasRepository } from "../../repositories/interfaces/aulas/aulas-repository";

// Interface
interface CreateFavoritoRequest {
  id_aluno: string;
  id_aula: string;
}

// Service
export class CreateFavoritoService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private favoritosRepository: FavoritosRepository,
    private alunosRepository: AlunosRepository,
    private aulasRepository: AulasRepository,
  ) {}

  // Executando o service
  async execute(request: CreateFavoritoRequest) {
    
    // Dados do service
    const { id_aluno, id_aula } = request;

    // Verificando se o aluno existe
    if(!(await this.alunosRepository.find({id: id_aluno}))){
      return new Error("Aluno inexistente!");
    }

    // Verificando se a atividade existe
    if(!(await this.aulasRepository.find({id: id_aula}))){
      return new Error("Aula inexistente!");
    }

    // Criando ...
    const favorito = await this.favoritosRepository.create({
      id_aluno, 
      id_aula,
    })

    // Retornando dado criado para o controller
    return favorito;
  }
}