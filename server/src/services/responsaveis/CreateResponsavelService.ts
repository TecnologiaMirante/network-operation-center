import { hash } from "bcryptjs";
import { EscolaUsersRepository } from "../../repositories/interfaces/escolas/escolas-users-repository";
import { ResponsaveisRepository } from "../../repositories/interfaces/responsaveis/responsaveis-repository";
// import { MailAdapter } from "../../adapters/mail-adapter";

interface CreateResponsavelRequest {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
}

export class CreateResponsavelService {

  // Recebendo o repositório no construtor
  constructor(
    private escolaUsersRepository: EscolaUsersRepository,
    private responsaveisRepository: ResponsaveisRepository,
    // private mailAdapter: MailAdapter,
  ) {}

  // Executando o service
    async execute(request: CreateResponsavelRequest) {

      // Dados do service
      const { name, email, cpf, phone } = request;

      // Verificando se o email já foi utilizado para cadastro de algum usuário
      if(await this.escolaUsersRepository.findUserWithExistentEmail({email})){
        return new Error("Email já cadastrado!")
      }

      // Verificando se o email já foi utilizado para cadastro de algum responsavel
      if(await this.responsaveisRepository.findUserWithExistentEmail({email})){
        return new Error("Email já cadastrado!")
      }

      // Verificando se o CPF já foi utilizado para cadastro
      if(await this.escolaUsersRepository.findUserWithExistentCPF({cpf})){
        return new Error("CPF já cadastrado!")
      }

      // Verificando se o CPF já foi utilizado para cadastro
      if(await this.responsaveisRepository.findUserWithExistentCPF({cpf})){
        return new Error("CPF já cadastrado!")
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
      //       `<p>Esta é a sua senha temporária: ${randomPassword}</p>`,
      //       `<p>Por favor, altere-a no seu primeiro login!</p>`,
      //       `</div>`,
      //       ].join('\n'),
      //       email: email
      //   });
      // } catch (err) {
      // return new Error("Impossível enviar email de criação do usuário!");
      // }

      // Criando o responsável...
      return await this.responsaveisRepository.create({
        name, 
        email,
        password: passwordHash,
        cpf,
        phone
      });
    }
}