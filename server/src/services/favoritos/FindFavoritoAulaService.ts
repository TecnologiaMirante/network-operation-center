import { FavoritosRepository} from "../../repositories/interfaces/favoritos/favoritos";

// Interface
interface FindFavoritoRequest {
  id: string;
}

// Service
export class FindFavoritoService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private favoritosRepository: FavoritosRepository,
  ) {}

  // Executando o service
  async execute(request: FindFavoritoRequest) {
    
    // Dados do service
    const { id } = request;

    const data = await(this.favoritosRepository.find({id}));

    if (!data) {
      return new Error("Registro inexistente!");
    }

    // Retornando dado encontrado para o controller
    return data;
  }
}