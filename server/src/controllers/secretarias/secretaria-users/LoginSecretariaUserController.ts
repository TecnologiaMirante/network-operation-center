import { Request, Response } from "express";
import { PrismaSecretariaUsersRepository } from "../../../repositories/prisma/secretarias/prisma-secretaria-users-repository";
import { FindSecretariaUsersLoginDataService } from "../../../services/secretarias/secretaria-users/FindSecretariaUserLoginDataService";
import { LoginSecretariaUserService } from "../../../services/secretarias/secretaria-users/LoginSecretariaUserService";

class LoginSecretariaUserController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { mat, password } = req.body;

    // Repositório do modelo secretariaUser do Prisma
    const prismaSecretariaUsersRepository = new PrismaSecretariaUsersRepository();

    // Service da SecretariaUser
    const loginSecretariaUserService = new LoginSecretariaUserService(prismaSecretariaUsersRepository);

    // Executando o service
    const secretariaUser = await loginSecretariaUserService.execute({
      mat,
      password,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(secretariaUser instanceof Error) {
      return res.status(400).send(secretariaUser.message);
    }

    // Service
    const findSecretariaUsersLoginDataService = new FindSecretariaUsersLoginDataService(prismaSecretariaUsersRepository);

    // Executando o service
    const user = await findSecretariaUsersLoginDataService.execute({ id: Object(secretariaUser).user_id });

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        token: Object(secretariaUser).token,
      }
    );

    // // Retornando mensagem de sucesso para o usuário
    // return res.status(200).send(
    //   {
    //     secretariaUser
    //   }
    // );
  }
}

export { LoginSecretariaUserController };