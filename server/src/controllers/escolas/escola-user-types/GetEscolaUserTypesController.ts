import { Request, Response} from "express";
import { PrismaEscolaUserTypesRepository } from "../../../repositories/prisma/escolas/prisma-escolas-user-types-repository";
import { GetEscolaUserTypesService } from "../../../services/escolas/escola-user-types/GetEscolaUserTypesService";

class GetEscolaUserTypesController {
  async handle(req:Request, res:Response) {
    
    // Repositório do modelo Tipo do Prisma
    const prismaEscolaUserTypeRepository = new PrismaEscolaUserTypesRepository();
    
    // Service do Tipo
    const getEscolaUserTypesService = new GetEscolaUserTypesService(prismaEscolaUserTypeRepository);

    // Executando o service
    const escolaUserTypes = await getEscolaUserTypesService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolaUserTypes instanceof Error) {
      return res.status(400).send(escolaUserTypes.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        escolaUserTypes
      }
    )

  };
}

export { GetEscolaUserTypesController };