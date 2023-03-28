import { hash } from "bcryptjs";
import { SecretariaUsersRepository } from "../../../repositories/interfaces/secretarias/secretaria-users-repository";
import { SecretariasRepository } from "../../../repositories/interfaces/secretarias/secretarias-repository";
import { ResponsaveisRepository } from "../../../repositories/interfaces/responsaveis/responsaveis-repository";
// import { MailAdapter } from "../../../adapters/mail-adapter";

interface CreateSecreatariaFirstUserRequest {
  name: string;
  email: string;
  mat: string;
  id_secretaria: string;
}

export class CreateSecretariaFirstUserService {

  // Recebendo o repositório no construtor
  constructor(
    private secretariaUsersRepository: SecretariaUsersRepository,
    private secretariasRepository: SecretariasRepository,
    // private mailAdapter: MailAdapter,
  ) {}

  // Executando o service
    async execute(request: CreateSecreatariaFirstUserRequest) {

      // Dados do service
      const { name, email, mat, id_secretaria } = request;

      // Verificando se o email já foi utilizado para cadastro
      if(await this.secretariaUsersRepository.findUserWithExistentEmail({email})){
        return new Error("Email já cadastrado!")
      }

      // Verificando se a Matrícula já foi utilizada para cadastro
      if(await this.secretariaUsersRepository.findUserWithExistentMat({mat})){
        return new Error("Matrícula já cadastrada!")
      }

      // Verificando se a secretaria existe
      if(!(await this.secretariasRepository.find({id: id_secretaria}))){
        return new Error("Secretaria inexistente!");
      }

      // Gerando a senha aleatória
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
      //       `<p>Esta é a sua matrícula: ${mat}</p>`,
      //       `<p>Esta é a sua senha temporária: ${randomPassword}</p>`,
      //       `<p>Por favor, altere-a no seu primeiro login!</p>`,
      //       `</div>`,
      //       ].join('\n'),
      //       email: email
      //   });
      // } catch (err) {
      //   return new Error("Impossível enviar email de criação do usuário!");
      // }

      // Criando o escola...
      return await this.secretariaUsersRepository.create({
        name, 
        email,
        password: passwordHash,
        mat,
        id_secretaria
      });
    }
}