import { Request, Response } from "express";
import { PrismaSecretariaUsersRepository } from "../../../repositories/prisma/secretarias/prisma-secretaria-users-repository";
import { DeleteSecretariaUserService } from "../../../services/secretarias/secretaria-users/DeleteSecretariaUserService";

class DeleteSecretariaUserController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo secretariaUsers do Prisma
    const prismaSecretariaUsersRepository = new PrismaSecretariaUsersRepository();

    // Service da secretariaUser
    const deleteSecretariaUserService = new DeleteSecretariaUserService(prismaSecretariaUsersRepository);

    // Executando o service
    const secretaria = await deleteSecretariaUserService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(secretaria instanceof Error) {
      return res.status(400).send(secretaria.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteSecretariaUserController };