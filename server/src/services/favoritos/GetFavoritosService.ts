import { FavoritosRepository} from "../../repositories/interfaces/favoritos/favoritos";

// Service
export class GetFavoritosService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private favoritosRepository: FavoritosRepository,
  ) {}

  // Executando o service
  async execute() {

    const data = await(this.favoritosRepository.get());

    if (Object.keys(data).length == 0) {
      return new Error("Registros inexistentes!");
    }

    // Retornando dado encontrado para o controller
    return data;
  }
}