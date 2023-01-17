import { hash } from "bcryptjs";
import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";
import { EscolasRepository } from "../../../repositories/interfaces/escolas/escolas-repository";
import { ResponsaveisRepository } from "../../../repositories/interfaces/responsaveis/responsaveis-repository";
// import { MailAdapter } from "../../../adapters/mail-adapter";

interface CreateEscolaUserRequest {
  name: string;
  email: string;
  cpf?: string;
  mat?: string;
  born?: string;
  genre?: string;
  avatar?: string;
  id_responsavel?: string;
  id_escola: string;
}

export class CreateEscolaUserService {

  // Recebendo o repositório no construtor
  constructor(
    private escolaUsersRepository: EscolaUsersRepository,
    private escolasRepository: EscolasRepository,
    private responsaveisRepository: ResponsaveisRepository,
    // private mailAdapter: MailAdapter,
  ) {}

  // Executando o service
    async execute(request: CreateEscolaUserRequest) {

      // Dados do service
      const { name, email, cpf, mat, born, genre, avatar, id_responsavel, id_escola } = request;

      // Verificando se o email já foi utilizado para cadastro
      if(await this.escolaUsersRepository.findUserWithExistentEmail({email})){
        return new Error("Email já cadastrado!")
      }

      // Verificando se o email já foi utilizado para cadastro de algum responsavel
      if(await this.responsaveisRepository.findUserWithExistentEmail({email})){
        return new Error("Email já cadastrado!")
      }

      if (cpf) {
        // Verificando se o CPF já foi utilizado para cadastro
        if(await this.escolaUsersRepository.findUserWithExistentCPF({cpf})){
          return new Error("CPF já cadastrado!")
        }
  
        // Verificando se o CPF já foi utilizado para cadastro
        if(await this.responsaveisRepository.findUserWithExistentCPF({cpf})){
          return new Error("CPF já cadastrado!")
        }
      }

      if (mat) {
        // Verificando se a Matrícula já foi utilizada para cadastro
        if(await this.escolaUsersRepository.findUserWithExistentMat({mat})){
          return new Error("Matrícula já cadastrada!")
        }
      }

      // Verificando se a escola existe
      if(!(await this.escolasRepository.find({id: id_escola}))){
        return new Error("Escola inexistente!");
      }

      // Gerando a senha aleatória
      const randomPassword = Math.random().toString(36).slice(-8);

      // Criptografando a senha
      // const passwordHash = await hash(randomPassword, 8);
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

      // ################## ATENÇÃO ##########################
      // Irei alterar esta senha somente para testes
      // Todos os usuários possuem a senha "ramon123"

      // Criando o escola...
      const user = await this.escolaUsersRepository.create({
        name, 
        email,
        // password: passwordHash,
        password: "ramon123",
        cpf,
        mat,
        born,
        genre,
        avatar,
        id_responsavel,
        id_escola
      });

      // return {user, randomPassword}
      return {user}      

    }
}