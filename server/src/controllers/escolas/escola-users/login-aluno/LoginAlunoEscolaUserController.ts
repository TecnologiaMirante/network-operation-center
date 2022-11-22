import { Request, Response } from "express";
import { PrismaEscolaUsersRepository } from "../../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { LoginEscolaUserService } from "../../../../services/escolas/escola-users/LoginEscolaUserService";
import { FindAlunoEscolaUsersLoginDataService } from "../../../../services/escolas/escola-users/FindAlunoEscolaUserLoginDataService";

class LoginAlunoEscolaUserController {
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

    // Service dos dados do aluno
    const findAlunoEscolaUsersLoginDataService = new FindAlunoEscolaUsersLoginDataService(prismaEscolaUsersRepository);

    // Executando o service para receber os dados de login
    const user = await findAlunoEscolaUsersLoginDataService.execute({ id: Object(escolaUser).user_id });

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

export { LoginAlunoEscolaUserController };