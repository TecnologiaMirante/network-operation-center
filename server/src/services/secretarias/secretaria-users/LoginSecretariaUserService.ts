import { SecretariaUsersRepository } from "../../../repositories/interfaces/secretarias/secretaria-users-repository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
// const authConfig = require("../../../config/auth");

const secret = "<#thatswhatshesaid#>";


// Interface do LoginSecretaria
interface LoginSecretariaUserRequest {
  mat: string;
  password: string;
}

// Service
export class LoginSecretariaUserService {
  
  // Recebendo o repositório da SecretariaUser no construtor
  constructor(
    private secretariasUsersRepository: SecretariaUsersRepository,
  ) {}

  // Executando o service
  async execute(request: LoginSecretariaUserRequest) {
    
    // Dados do service
    const { mat, password } = request;

    // Se o usuário não inserir os dados obrigatórios
    if (!mat || !password ) {
      return new Error(`Por favor, preencha todos os campos obrigatórios!`);
    }

    // Buscando o usuario
    const secretariaUser = await this.secretariasUsersRepository.findUserWithExistentMat({mat});
    
    // Se não existir usuario
    if (!secretariaUser) {
      return new Error("Usuário inexistente!");
    }

    // Se a senha inserida é igual a cadastrada
    if (!await compare(password, Object(secretariaUser).password)) {
        return new Error("Email/senha inválida!")
    }

    // Realizando o login
    const token = sign(
        {email: Object(secretariaUser).email},
        secret,
        {
          subject: Object(secretariaUser).id,
          expiresIn: 86400
        }
      )
      
    // // Realizando o login
    // const token = sign(
    //     {email: Object(secretariaUser).email},
    //     authConfig.secret,
    //     {
    //       subject: Object(secretariaUser).id,
    //       expiresIn: 86400
    //     }
    //   )

    return {
      user_id: Object(secretariaUser).id, 
      token: token
    };
  }
}