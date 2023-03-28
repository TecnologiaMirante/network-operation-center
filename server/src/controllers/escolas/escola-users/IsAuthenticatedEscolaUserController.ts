import { Request, Response } from "express";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { LoginEscolaUserService } from "../../../services/escolas/escola-users/LoginEscolaUserService";
import { FindEscolaUserHasTypesByUserService } from "../../../services/escolas/escola-user-has-types/FindEscolaUserHasTypesByUserService";
import { PrismaEscolaUserHasTypesRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-types-repository";
import { PrismaAlunosRepository } from "../../../repositories/prisma/alunos/prisma-alunos-repository";
import { FindAlunoByUserService } from "../../../services/alunos/FindAlunoByUserService";
import { FindEscolaUsersService } from "../../../services/escolas/escola-users/FindEscolaUserService";
import { FindEscolaUsersLoginDataService } from "../../../services/escolas/escola-users/FindEscolaUserLoginDataService";
import { IsAuthenticatedEscolaUserService } from "../../../services/escolas/escola-users/IsAuthenticatedEscolaUserService";

class IsAuthenticatedEscolaUserController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id } = req.params;

    // Repositório do modelo EscolaUser do Prisma
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();

    // Service da SecretariaUser
    const isAuthenticatedEscolaUserService = new IsAuthenticatedEscolaUserService(prismaEscolaUsersRepository);

    // Executando o service
    const isAuthenticated = await isAuthenticatedEscolaUserService.execute({
      id
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(isAuthenticated instanceof Error) {
      return res.status(400).send(isAuthenticated.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        data: isAuthenticated,
      }
    );
    // return res.status(200).send(
    //   {
    //     data: {
    //       token: Object(escolaUser).token,
    //       user
    //     }
    //   }
    // );
  }
}

export { IsAuthenticatedEscolaUserController };