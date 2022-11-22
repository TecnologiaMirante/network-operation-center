import { Request, Response} from "express";
import { PrismaEscolaUserHasPhonesRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-phones-repository";
import { DeleteEscolaUserHasPhonesService } from "../../../services/escolas/escola-user-has-phones/DeleteEscolaUserHasPhonesService";

class DeleteEscolaUserHasPhonesController {
  async handle(req:Request, res:Response) {

    // Dados do parãmetro
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaEscolaUserHasPhonesRepository = new PrismaEscolaUserHasPhonesRepository();
    
    // Service do Tipo
    const deleteEscolaUserHasPhonesService = new DeleteEscolaUserHasPhonesService(prismaEscolaUserHasPhonesRepository);

    // Executando o service
    const escolaUserHasPhones = await deleteEscolaUserHasPhonesService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolaUserHasPhones instanceof Error) {
      return res.status(400).send(escolaUserHasPhones.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  };
}

export { DeleteEscolaUserHasPhonesController };