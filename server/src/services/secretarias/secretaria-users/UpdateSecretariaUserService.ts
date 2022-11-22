import { SecretariaUsersRepository } from "../../../repositories/interfaces/secretarias/secretaria-users-repository";
import { SecretariasRepository } from "../../../repositories/interfaces/secretarias/secretarias-repository";

// Interface do UpdateSecretariaUser
interface UpdateSecretariaUserRequest {
  id: string;
  name: string;
  email: string;
  id_secretaria: string;
}

// Service
export class UpdateSecretariaUserService {
  
  // Recebendo o repositório da UpdateSecretariaUser no construtor
  constructor(
    private secretariasUsersRepository: SecretariaUsersRepository,
    private secretariasRepository: SecretariasRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateSecretariaUserRequest) {

    // Dados do service
    const { id, name, email, id_secretaria } = request;

    // Se não existir usuario, retorna mensagem de erro
    if (!(await this.secretariasUsersRepository.find({id}))) {
      return new Error("Usuário inexistente!");
    }
    
    // Se o usuário não inserir nenhum dado, não há o que atualizar
    if (!name && !email && !id_secretaria) {
      return new Error("Por favor, insira algum dado!");
    }

    // Se o usuário inserir o email
    if (email) {
      // Verificando se o email já foi utilizado para cadastro
      if(await this.secretariasUsersRepository.findUserWithExistentEmail({email})){
        return new Error("Email já cadastrado!")
      }
    }

    // Se o usuário inserir algum id de secretaria, verifica se ela existe
    if (id_secretaria) {
      // Verificando se a secretaria existe
      if(!(await this.secretariasRepository.find({id: id_secretaria}))){
        return new Error("Secretaria inexistente!");
      }
    }

    // Atualizando o usuario
    await this.secretariasUsersRepository.update({id, name, email, id_secretaria})

    return;
  }
}