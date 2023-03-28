import { Request, Response} from "express";
import { PrismaEscolaUserHasTypesRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-types-repository";
import { GetEscolaUserHasTypesService } from "../../../services/escolas/escola-user-has-types/GetEscolaUserHasTypesService";

class GetEscolaUserHasTypesController {
  async handle(req:Request, res:Response) {
    
    // Repositório do modelo Tipo do Prisma
    const prismaEscolaUserHasTypesRepository = new PrismaEscolaUserHasTypesRepository();
    
    // Service do Tipo
    const getEscolaUserHasTypesService = new GetEscolaUserHasTypesService(prismaEscolaUserHasTypesRepository);

    // Executando o service
    const escolaUserHasTypes = await getEscolaUserHasTypesService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolaUserHasTypes instanceof Error) {
      return res.status(400).send(escolaUserHasTypes.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        escolaUserHasTypes
      }
    )

  };
}

export { GetEscolaUserHasTypesController };