import { Request, Response} from "express";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { FindEscolaUsersService } from "../../../services/escolas/escola-users/FindEscolaUserService";

class FindEscolaUserController {
  async handle(req:Request, res:Response) {
    
    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();
    
    // Service
    const findEscolaUsersService = new FindEscolaUsersService(prismaEscolaUsersRepository);

    // Executando o service
    const escolaUsers = await findEscolaUsersService.execute({id});

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

export { FindEscolaUserController };