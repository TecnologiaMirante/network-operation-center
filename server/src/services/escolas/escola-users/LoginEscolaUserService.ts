import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
// const authConfig = require("../../../config/auth");

const secret = "<#thatswhatshesaid#>";

// Interface
interface LoginEscolaUserRequest {
  mat: string;
  password: string;
}

// Service
export class LoginEscolaUserService {
  
  // Recebendo o repositório da EscolaUser no construtor
  constructor(
    private escolaUsersRepository: EscolaUsersRepository,
  ) {}

  // Executando o service
  async execute(request: LoginEscolaUserRequest) {
    
    // Dados do service
    const { mat, password } = request;

    // Buscando o usuario
    const escolaUser = await this.escolaUsersRepository.findUserWithExistentMat({mat});

    // Se não existir usuario
    if (!escolaUser) {
      return new Error("Usuário inexistente!");
    }

    // Se a senha inserida é igual a cadastrada
    if (!(password == Object(escolaUser).password)) {
      return new Error("Matrícula/Senha inválida!")
    }

    // // Se a senha inserida é igual a cadastrada
    // if (!await compare(password, Object(escolaUser).password)) {
    //   return new Error("Matrícula/Senha inválida!")
    // }

    try {
      
      // Realizando o login
      const token = sign(
        {email: Object(escolaUser).email},
        secret,
        {
          subject: Object(escolaUser).id,
          expiresIn: 86400
        }
      )
      // // Realizando o login
      // const token = sign(
      //   {email: Object(escolaUser).email},
      //   authConfig.secret,
      //   {
      //     subject: Object(escolaUser).id,
      //     expiresIn: 86400
      //   }
      // )

      // Atualizando o status de autenticação
      await this.escolaUsersRepository.authenticate({ id: Object(escolaUser).id, status: true })

      return {
        user_id: Object(escolaUser).id, 
        token: token,
      };
      
    } catch (err) {
      return new Error("Não foi possível realizar o login");
    }
  }
}