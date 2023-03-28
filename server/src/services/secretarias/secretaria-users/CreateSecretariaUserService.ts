import { hash } from "bcryptjs";
// import { MailAdapter } from "../../../adapters/mail-adapter";
import { SecretariaUsersRepository } from "../../../repositories/interfaces/secretarias/secretaria-users-repository";
import { SecretariasRepository } from "../../../repositories/interfaces/secretarias/secretarias-repository";

// Interface do createSecretaria
interface CreateSecretariaUserRequest {
  name: string;
  email: string;
  id_secretaria: string;
}

// Service
export class CreateSecretariaUserService {
  
  // Recebendo o repositório da SecretariaUser no construtor
  constructor(
    private secretariasUsersRepository: SecretariaUsersRepository,
    private secretariasRepository: SecretariasRepository,
    // private mailAdapter: MailAdapter,
  ) {}

  // Executando o service
  async execute(request: CreateSecretariaUserRequest) {
    
    // Dados do service
    const { name, email, id_secretaria } = request;

    // Verificando se o email já foi utilizado para cadastro
    if(await this.secretariasUsersRepository.findUserWithExistentEmail({email})){
      return new Error("Email já cadastrado!")
    }

    // Verificando se a secretaria existe
    const id = id_secretaria;
    if(!(await this.secretariasRepository.find({id}))){
      return new Error("Secretaria inexistente!");
    }

    // Gerando matrícula aleatoriamente
    // Utiliza numeros entre 1 e 100
    const num_1 = Math.random().toString().slice(2,6);
    const num_2 = Math.random().toString(36).slice(-4);
    const mat = num_1 + num_2;

    const randomPassword = Math.random().toString(36).slice(-8);

    // Criptografando a senha
    const passwordHash = await hash(randomPassword, 8);

    // Enviando o email
    // try {
    //   await this.mailAdapter.sendMail({
    //       subject: "Novo feedback",
    //       body: [
    //       `<div style="font-family: sans-serif; font-size: 16px; color: #111";>`,
    //       `<p>Usuário criado!</p>`,
    //       `<p>Esta é a sua senha temporária: ${randomPassword}</p>`,
    //       `<p>Por favor, altere-a no seu primeiro login!</p>`,
    //       `</div>`,
    //       ].join('\n'),
    //       email: email
    //   });
    // } catch (err) {
    //   return new Error("Impossível enviar email de criação do usuário!");
    // }

    // Criando a secretariaUser ...
    await this.secretariasUsersRepository.create({
      name,
      email,
      password: passwordHash,
      mat,
      id_secretaria,
    })
  }
}