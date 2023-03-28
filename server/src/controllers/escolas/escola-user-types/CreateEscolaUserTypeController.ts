import { Request, Response } from "express";
import { PrismaEscolaUserTypesRepository } from "../../../repositories/prisma/escolas/prisma-escolas-user-types-repository";
import { CreateEscolaUserTypeService } from "../../../services/escolas/escola-user-types/CreateEscolaUserTypeService";

class CreateEscolaUserTypeController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name } = req.body;

    // Repositório do modelo EscolaUserType do Prisma
    const prismaEscolaUserTypeRepository = new PrismaEscolaUserTypesRepository();

    // Service da EscolaUserType
    const createEscolaUserTypeService = new CreateEscolaUserTypeService(prismaEscolaUserTypeRepository);

    // Executando o service
    const escolaUserType = await createEscolaUserTypeService.execute({
      name,
    })

    if (escolaUserType instanceof Error) {
      return res.status(400).send(escolaUserType.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Tipo criado com sucesso!",
      }
    );
  }
}

export { CreateEscolaUserTypeController };