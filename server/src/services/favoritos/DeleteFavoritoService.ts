import { FavoritosRepository} from "../../repositories/interfaces/favoritos/favoritos";

// Interface
interface DeleteFavoritoRequest {
  id: string;
}

// Service
export class DeleteFavoritoService {
  
  // Recebendo o repositório do favorito no construtor
  constructor(
    private favoritosRepository: FavoritosRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteFavoritoRequest) {

    // Dados do service
    const { id } = request;

    const data = await(this.favoritosRepository.find({id}));

    if (!data) {
      return new Error("Registro inexistente!");
    }

    // Retornando dado encontrado para o controller
    return this.favoritosRepository.delete({ id });
  }
}