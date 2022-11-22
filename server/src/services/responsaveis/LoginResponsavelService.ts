import { ResponsaveisRepository } from "../../repositories/interfaces/responsaveis/responsaveis-repository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
// const authConfig = require("../../config/auth");

const secret = "<#thatswhatshesaid#>";


// Interface
interface LoginResponsavelRequest {
  cpf: string;
  password: string;
}

// Service
export class LoginResponsavelService {
  
  // Recebendo o repositório da EscolaUser no construtor
  constructor(
    private responsaveisRepository: ResponsaveisRepository,
  ) {}

  // Executando o service
  async execute(request: LoginResponsavelRequest) {
    
    // Dados do service
    const { cpf, password } = request;

    // Buscando o usuario
    const resp = await this.responsaveisRepository.findUserWithExistentCPF({cpf});

    // Se não existir usuario
    if (!resp) {
      return new Error("Responsável inexistente!");
    }

    // Se a senha inserida é igual a cadastrada
    if (!await compare(password, Object(resp).password)) {
      return new Error("Matrícula/Senha inválida!")
    }

    // Realizando o login
    const token = sign(
      {email: Object(resp).email},
      secret,
      {
        subject: Object(resp).id,
        expiresIn: 86400
      }
    )
    // // Realizando o login
    // const token = sign(
    //   {email: Object(resp).email},
    //   authConfig.secret,
    //   {
    //     subject: Object(resp).id,
    //     expiresIn: 86400
    //   }
    // )

    return {
      resp_id: Object(resp).id, 
      token: token
    };

  }
}