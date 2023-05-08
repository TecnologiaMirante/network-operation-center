import { Request, Response} from "express";
import { PrismaEscolaUserHasTypesRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-types-repository";
import { DeleteEscolaUserHasTypesService } from "../../../services/escolas/escola-user-has-types/DeleteEscolaUserHasTypesService";

class DeleteEscolaUserHasTypesController {
  async handle(req:Request, res:Response) {
    
    // Dados do parãmetro
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaEscolaUserHasTypesRepository = new PrismaEscolaUserHasTypesRepository();
    
    // Service do Tipo
    const findEscolaUserHasTypesService = new DeleteEscolaUserHasTypesService(prismaEscolaUserHasTypesRepository);

    // Executando o service
    const escolaUserHasTypes = await findEscolaUserHasTypesService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolaUserHasTypes instanceof Error) {
      return res.status(400).send(escolaUserHasTypes.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  };
}

export { DeleteEscolaUserHasTypesController };