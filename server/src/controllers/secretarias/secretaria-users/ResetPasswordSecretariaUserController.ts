import { Request, Response } from "express";
import { PrismaSecretariaUsersRepository } from "../../../repositories/prisma/secretarias/prisma-secretaria-users-repository";
import { ResetPasswordService } from "../../../services/secretarias/secretaria-users/ResetPasswordSecretariaUserService";

class ResetPasswordController {
  async handle(req:Request, res:Response) {

    // Recebendo dados do usuário via corpo
    const { email, token, password } = req.body;

    // Repositórios
    const prismaUsersRepository = new PrismaSecretariaUsersRepository();

    // Service
    const resetPasswordService = new ResetPasswordService(prismaUsersRepository);

    // Executando o service
    const reset = await resetPasswordService.execute({ email, token, password });

    // Se acontecer algum erro durante a execução do service, dispara um erro
    if (reset instanceof Error) {
      return res.status(400).send(reset.message);
    }

    // Retorna a mensagem e o status de sucesso para o usuário
    return res.status(200).send({
      message: "Senha alterada com sucesso!"
    })
  }
}

export { ResetPasswordController };