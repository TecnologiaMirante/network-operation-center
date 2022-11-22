import { Request, Response} from "express";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { GetEscolaUsersService } from "../../../services/escolas/escola-users/GetEscolaUsersService";

class GetEscolaUsersController {
  async handle(req:Request, res:Response) {
    
    // Repositório do modelo do Prisma
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();
    
    // Service
    const getEscolaUsersService = new GetEscolaUsersService(prismaEscolaUsersRepository);

    // Executando o service
    const escolaUsers = await getEscolaUsersService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolaUsers instanceof Error) {
      return res.status(400).send(escolaUsers.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        escolaUsers
      }
    )

  };
}

export { GetEscolaUsersController };