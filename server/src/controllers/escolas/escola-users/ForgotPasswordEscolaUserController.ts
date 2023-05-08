import { Request, Response } from "express";
// import { NodemailerMailAdapter } from "../../../adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { ForgotPasswordEscolaUsersService } from "../../../services/escolas/escola-users/ForgotPasswordEscolaUserService";

class ForgotPasswordEscolaUsersController {
  async handle(req:Request, res:Response) {

    // Recebendo dados do usuário via corpo
    const { email } = req.body;

    // Repositórios
    const prismaEscolasUsersRepository = new PrismaEscolaUsersRepository();

    // const nodemailerMailAdapter = new NodemailerMailAdapter();

    // Service
    const forgotPasswordService = new ForgotPasswordEscolaUsersService(
      prismaEscolasUsersRepository, 
      // nodemailerMailAdapter
      );

    // Executando o service
    const send = await forgotPasswordService.execute({email});

    // Se acontecer algum erro durante a execução do service, dispara um erro
    if (send instanceof Error) {
      return res.status(400).send({ error: "Erro resetando a senha. Por favor, tente novamente!"});
    }

    // Retorna a mensagem e o status de sucesso para o usuário
    return res.status(200).send({
      message: "Token sent"
    });
  }
}

export { ForgotPasswordEscolaUsersController };