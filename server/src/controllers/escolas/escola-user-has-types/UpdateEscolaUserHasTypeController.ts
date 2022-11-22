import { Request, Response } from "express";
import { PrismaEscolaUserHasTypesRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-types-repository";
import { PrismaEscolaUserTypesRepository } from "../../../repositories/prisma/escolas/prisma-escolas-user-types-repository" 
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { UpdateEscolaUserHasTypeService } from "../../../services/escolas/escola-user-has-types/UpdateEscolaUserHasTypeService";

class UpdateEscolaUserHasTypeController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { id_escola_user, id_type } = req.body;

    // Repositório do modelo do Prisma
    const prismaEscolaUserHasTypesRepository = new PrismaEscolaUserHasTypesRepository();
    const prismaEscolaUserTypesRepository = new PrismaEscolaUserTypesRepository();
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();

    // Service da EscolaUserType
    const createEscolaUserHasTypeService = new UpdateEscolaUserHasTypeService( prismaEscolaUserHasTypesRepository, prismaEscolaUserTypesRepository, prismaEscolaUsersRepository);

    // Executando o service
    const escolaUserType = await createEscolaUserHasTypeService.execute({
      id,
      id_escola_user, 
      id_type,
    })

    if (escolaUserType instanceof Error) {
      return res.status(400).send(escolaUserType.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateEscolaUserHasTypeController };