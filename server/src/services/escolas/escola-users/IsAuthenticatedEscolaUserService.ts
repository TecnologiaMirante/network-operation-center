import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";

// Interface
interface IsAuthenticatedEscolaUserRequest {
  id: string;
}

// Service
export class IsAuthenticatedEscolaUserService {
  
  // Recebendo o repositório da EscolaUser no construtor
  constructor(
    private escolaUsersRepository: EscolaUsersRepository,
  ) {}

  // Executando o service
  async execute(request: IsAuthenticatedEscolaUserRequest) {
    
    // Dados do service
    const { id } = request;

    // Buscando o usuario
    const escolaUserIsAuthenticated = await this.escolaUsersRepository.isAuthenticated({id});

    // Se não existir usuario
    if (!escolaUserIsAuthenticated) {
      return new Error("Usuário inexistente!");
    }

    return escolaUserIsAuthenticated;
  }
}