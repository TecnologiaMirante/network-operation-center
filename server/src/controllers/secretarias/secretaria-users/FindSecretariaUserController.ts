import { Request, Response } from "express";
import { PrismaSecretariaUsersRepository } from "../../../repositories/prisma/secretarias/prisma-secretaria-users-repository";
import { FindSecretariaUserService } from "../../../services/secretarias/secretaria-users/FindSecretariaUserService";

class FindSecretariaUserController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo secretariaUsers do Prisma
    const prismaSecretariaUsersRepository = new PrismaSecretariaUsersRepository();

    // Service da secretariaUser
    const findSecretariaUserService = new FindSecretariaUserService(prismaSecretariaUsersRepository);

    // Executando o service
    const user = await findSecretariaUserService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(user instanceof Error) {
      return res.status(400).send(user.message);
    }

    // Retornando o usuario para o usuario
    return res.status(200).send(
      {
        user
      }
    )
  }
}

export { FindSecretariaUserController };