import { Request, Response } from "express";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { ResetPasswordEscolaUserService } from "../../../services/escolas/escola-users/ResetPasswordEscolaUserService";

class ResetPasswordEscolaUsersController {
  async handle(req:Request, res:Response) {

    // Recebendo dados do usuário via corpo
    const { email, token, password } = req.body;

    // Repositórios
    const prismaEscolasUsersRepository = new PrismaEscolaUsersRepository();

    // Service
    const resetPasswordService = new ResetPasswordEscolaUserService(prismaEscolasUsersRepository);

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

export { ResetPasswordEscolaUsersController };