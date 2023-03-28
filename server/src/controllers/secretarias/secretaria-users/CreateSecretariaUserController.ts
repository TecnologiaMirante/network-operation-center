import { Request, Response } from "express";
// import { NodemailerMailAdapter } from "../../../adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaSecretariaUsersRepository } from "../../../repositories/prisma/secretarias/prisma-secretaria-users-repository";
import { PrismaSecretariasRepository } from "../../../repositories/prisma/secretarias/prisma-secretarias-repository";
import { CreateSecretariaUserService } from "../../../services/secretarias/secretaria-users/CreateSecretariaUserService";

class CreateSecretariaUserController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name, email, id_secretaria } = req.body;

    // Repositório do modelo secretariaUser do Prisma
    const prismaSecretariaUsersRepository = new PrismaSecretariaUsersRepository();
    // Repositório do modelo secretaria do Prisma
    const prismaSecretariasRepository = new PrismaSecretariasRepository();
    // const nodemailerMailAdapter = new NodemailerMailAdapter();

    // Service da SecretariaUser
    const createSecretariaUserService = new CreateSecretariaUserService(prismaSecretariaUsersRepository, prismaSecretariasRepository, 
      // nodemailerMailAdapter
      );

    // Executando o service
    const secretariaUser = await createSecretariaUserService.execute({
      name,
      email,
      id_secretaria,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(secretariaUser instanceof Error) {
      return res.status(400).send(secretariaUser.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Usuário criado com sucesso!",
      }
    );
  }
}

export { CreateSecretariaUserController };