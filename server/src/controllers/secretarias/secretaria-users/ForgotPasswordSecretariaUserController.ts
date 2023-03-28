import { Request, Response } from "express";
// import { NodemailerMailAdapter } from "../../../adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaSecretariaUsersRepository } from "../../../repositories/prisma/secretarias/prisma-secretaria-users-repository";
import { ForgotPasswordService } from "../../../services/secretarias/secretaria-users/ForgotPasswordSecretariaUserService";

class ForgotPasswordController {
  async handle(req:Request, res:Response) {

    // Recebendo dados do usuário via corpo
    const { email } = req.body;

    // Repositórios
    const prismaSecretariaUsersRepository = new PrismaSecretariaUsersRepository();
    // const nodemailerMailAdapter = new NodemailerMailAdapter();

    // Service
    const forgotPasswordService = new ForgotPasswordService(prismaSecretariaUsersRepository, 
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

export { ForgotPasswordController };