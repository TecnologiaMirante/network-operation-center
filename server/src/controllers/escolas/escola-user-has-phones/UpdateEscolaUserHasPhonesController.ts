import { Request, Response} from "express";
import { PrismaEscolaUserHasPhonesRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-phones-repository";
import { UpdateEscolaUserHasPhonesService } from "../../../services/escolas/escola-user-has-phones/UpdateEscolaUserHasPhonesService";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";

class UpdateEscolaUserHasPhonesController {
  async handle(req:Request, res:Response) {

    // Dados do parãmetro
    const { id } = req.params;

    const { phone, id_user } = req.body;

    // Repositório do modelo do Prisma
    const prismaEscolaUserHasPhonesRepository = new PrismaEscolaUserHasPhonesRepository();
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();
    
    // Service do Tipo
    const updateEscolaUserHasPhonesService = new UpdateEscolaUserHasPhonesService(prismaEscolaUserHasPhonesRepository, prismaEscolaUsersRepository);

    // Executando o service
    const escolaUserHasPhones = await updateEscolaUserHasPhonesService.execute({id, phone, id_user});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolaUserHasPhones instanceof Error) {
      return res.status(400).send(escolaUserHasPhones.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  };
}

export { UpdateEscolaUserHasPhonesController };