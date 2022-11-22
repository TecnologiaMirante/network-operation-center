import { Request, Response} from "express";
import { PrismaEscolaUserTypesRepository } from "../../../repositories/prisma/escolas/prisma-escolas-user-types-repository";
import { FindEscolaUserTypeService } from "../../../services/escolas/escola-user-types/FindEscolaUserTypeService";

class FindEscolaUserTypeController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params; 

    // Repositório do modelo Tipo do Prisma
    const prismaEscolaUserTypeRepository = new PrismaEscolaUserTypesRepository();

    // Service do Tipo
    const findEscolaUserTypeService = new FindEscolaUserTypeService(prismaEscolaUserTypeRepository);

    // Executando o service
    const userTypes = await findEscolaUserTypeService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(userTypes instanceof Error) {
      return res.status(400).send(userTypes.message);
    }

    // Se der tudo certo, retorna os tipos encontrados para o usuário
    return res.status(200).send({
      userTypes
    });
  }
}

export { FindEscolaUserTypeController };