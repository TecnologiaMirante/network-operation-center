import { Request, Response} from "express";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { FindEscolaUsersLoginDataService } from "../../../services/escolas/escola-users/FindEscolaUserLoginDataService";

class FindEscolaUserLoginDataController {
  async handle(req:Request, res:Response) {
    
    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();
    
    // Service
    const findEscolaUsersLoginDataService = new FindEscolaUsersLoginDataService(prismaEscolaUsersRepository);

    // Executando o service
    const escolaUsers = await findEscolaUsersLoginDataService.execute({id});

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

export { FindEscolaUserLoginDataController };