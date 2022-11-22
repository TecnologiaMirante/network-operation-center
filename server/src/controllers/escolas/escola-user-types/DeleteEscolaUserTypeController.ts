import { Request, Response} from "express";
import { PrismaEscolaUserTypesRepository } from "../../../repositories/prisma/escolas/prisma-escolas-user-types-repository";
import { DeleteEscolaUserTypeService } from "../../../services/escolas/escola-user-types/DeleteEscolaUserTypeService";

class DeleteEscolaUserTypeController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params; 

    // Repositório do modelo Tipo do Prisma
    const prismaEscolaUserTypeRepository = new PrismaEscolaUserTypesRepository();

    // Service do Tipo
    const deleteEscolaUserTypeService = new DeleteEscolaUserTypeService(prismaEscolaUserTypeRepository);

    // Executando o service
    const userTypes = await deleteEscolaUserTypeService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(userTypes instanceof Error) {
      return res.status(400).send(userTypes.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteEscolaUserTypeController };