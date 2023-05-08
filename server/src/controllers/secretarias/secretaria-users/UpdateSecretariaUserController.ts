import { Request, Response } from "express";
import { PrismaSecretariaUsersRepository } from "../../../repositories/prisma/secretarias/prisma-secretaria-users-repository";
import { PrismaSecretariasRepository } from "../../../repositories/prisma/secretarias/prisma-secretarias-repository";
import { UpdateSecretariaUserService } from "../../../services/secretarias/secretaria-users/UpdateSecretariaUserService";

class UpdateSecretariaUserController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { name, email, id_secretaria } = req.body;

    // Repositório do modelo secretariaUser do Prisma
    const prismaSecretariasUsersRepository = new PrismaSecretariaUsersRepository();
    // Repositório do modelo secretaria do Prisma
    const prismaSecretariasRepository = new PrismaSecretariasRepository();

    // Service da Secretaria
    const updateSecretariaService = new UpdateSecretariaUserService(prismaSecretariasUsersRepository, prismaSecretariasRepository);

    // Executando o service
    const secretaria = await updateSecretariaService.execute({
      id,
      name,
      email,
      id_secretaria,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(secretaria instanceof Error) {
      return res.status(400).send(secretaria.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(204).send();
  }
}

export { UpdateSecretariaUserController };