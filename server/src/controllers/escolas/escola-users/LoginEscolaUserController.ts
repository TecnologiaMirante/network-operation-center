import { Request, Response } from "express";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { LoginEscolaUserService } from "../../../services/escolas/escola-users/LoginEscolaUserService";
import { FindEscolaUserHasTypesByUserService } from "../../../services/escolas/escola-user-has-types/FindEscolaUserHasTypesByUserService";
import { PrismaEscolaUserHasTypesRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-types-repository";
import { PrismaAlunosRepository } from "../../../repositories/prisma/alunos/prisma-alunos-repository";
import { FindAlunoByUserService } from "../../../services/alunos/FindAlunoByUserService";
import { FindEscolaUsersService } from "../../../services/escolas/escola-users/FindEscolaUserService";
import { FindEscolaUsersLoginDataService } from "../../../services/escolas/escola-users/FindEscolaUserLoginDataService";

class LoginEscolaUserController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { mat, password } = req.body;

    // Repositório do modelo EscolaUser do Prisma
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();

    // Service da SecretariaUser
    const loginEscolaUserService = new LoginEscolaUserService(prismaEscolaUsersRepository);

    // Executando o service
    const escolaUser = await loginEscolaUserService.execute({
      mat,
      password,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolaUser instanceof Error) {
      return res.status(400).send(escolaUser.message);
    }

    // Service
    const findEscolaUsersLoginDataService = new FindEscolaUsersLoginDataService(prismaEscolaUsersRepository);

    // Executando o service para receber os dados de login
    const user = await findEscolaUsersLoginDataService.execute({ id: Object(escolaUser).user_id });

    if (user instanceof Error) {
      return res.status(400).send(user.message);
    }

    // // Retornando mensagem de sucesso para o usuário
    // return res.status(200).send(
    //   {
    //     token: Object(escolaUser).token,
    //   }
    // );
    return res.status(200).send(
      {
          token: Object(escolaUser).token,
          user
      }
    );
  }
}

export { LoginEscolaUserController };