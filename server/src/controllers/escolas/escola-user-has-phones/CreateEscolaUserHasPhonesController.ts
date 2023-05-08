import { Request, Response} from "express";
import { PrismaEscolaUserHasPhonesRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-phones-repository";
import { CreateEscolaUserHasPhonesService } from "../../../services/escolas/escola-user-has-phones/CreateEscolaUserHasPhonesService";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";

class CreateEscolaUserHasPhonesController {
  async handle(req:Request, res:Response) {

    // Dados do corpo
    const { phone, id_user } = req.body;

    // Repositório do modelo do Prisma
    const prismaEscolaUserHasPhonesRepository = new PrismaEscolaUserHasPhonesRepository();
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();
    
    // Service do Tipo
    const createEscolaUserHasPhonesService = new CreateEscolaUserHasPhonesService(prismaEscolaUserHasPhonesRepository, prismaEscolaUsersRepository);

    // Executando o service
    const escolaUserHasPhones = await createEscolaUserHasPhonesService.execute({phone, id_user});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolaUserHasPhones instanceof Error) {
      return res.status(400).send(escolaUserHasPhones.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  };
}

export { CreateEscolaUserHasPhonesController };