import { Request, Response } from "express";
// import { NodemailerMailAdapter } from "../../adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaSecretariaUsersRepository } from "../../repositories/prisma/secretarias/prisma-secretaria-users-repository";
import { PrismaSecretariasRepository } from "../../repositories/prisma/secretarias/prisma-secretarias-repository";
import { CreateSecretariaService } from "../../services/secretarias/CreateSecretariaService";
import { CreateSecretariaFirstUserService } from "../../services/secretarias/secretaria-users/CreateSecreatariaFirstUserService";

class CreateSecretariaController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name, email } = req.body;

    // Repositório do modelo secretaria do Prisma
    const prismaSecretariasRepository = new PrismaSecretariasRepository();
    const prismaScretariaUsersRepository = new PrismaSecretariaUsersRepository();
    // const nodemailerMailAdapter = new NodemailerMailAdapter();

    // Service da Secretaria
    const createSecretariaService = new CreateSecretariaService(prismaSecretariasRepository);

    // Executando o service
    const secretaria = await createSecretariaService.execute({
      name,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(secretaria instanceof Error) {
      return res.status(400).send(secretaria.message);
    }

    // const createSecretariaFirstUserService = new CreateSecretariaFirstUserService(prismaScretariaUsersRepository, prismaSecretariasRepository, 
    //   // nodemailerMailAdapter
    //   );

    // // Criando nome específico
    // const userName = "Secretaria" + "-" + Math.random().toString(36).slice(-3);

    // const secretariaUser = await createSecretariaFirstUserService.execute({
    //   name: Object(secretaria).name,
    //   mat: userName,
    //   email: email,
    //   id_secretaria: Object(secretaria).id,
    // })

    // // Caso aconteça algum erro na criação do usuário padrão, interrompe o processo retorna a mensagem de erro
    // if(secretariaUser instanceof Error) {
    //   return res.status(400).send(secretariaUser.message);
    // }
    
    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Secretaria criada com sucesso!",
      }
    );
  }
}

export { CreateSecretariaController };