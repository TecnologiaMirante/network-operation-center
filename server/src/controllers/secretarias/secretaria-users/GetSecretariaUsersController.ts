import { Request, Response} from "express";
import { PrismaSecretariaUsersRepository } from "../../../repositories/prisma/secretarias/prisma-secretaria-users-repository";
import { PrismaSecretariasRepository } from "../../../repositories/prisma/secretarias/prisma-secretarias-repository";
import { GetSecretariaUsersService } from "../../../services/secretarias/secretaria-users/GetSecretariaUsersService";


class GetSecretariaUsersController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo secretariaUsers do Prisma
    const prismaSecretariaUsersRepository = new PrismaSecretariaUsersRepository();
    
    // Service da secretariaUsers
    const getSecretariaUsersService = new GetSecretariaUsersService(prismaSecretariaUsersRepository);

    // Executando o service
    const secretarias = await getSecretariaUsersService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(secretarias instanceof Error) {
      return res.status(400).send(secretarias.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        secretarias
      }
    )

  };
}

export { GetSecretariaUsersController };