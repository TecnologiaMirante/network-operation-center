import { Request, Response } from "express";
import { PrismaEscolaUserTypesRepository } from "../../../repositories/prisma/escolas/prisma-escolas-user-types-repository";
import { UpdateEscolaUserTypeService } from "../../../services/escolas/escola-user-types/UpdateEscolaUserTypeService";

class UpdateEscolaUserTypeController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { name } = req.body;

    // Repositório do modelo EscolaUserType do Prisma
    const prismaEscolaUserTypeRepository = new PrismaEscolaUserTypesRepository();

    // Service da EscolaUserType
    const updateEscolaUserTypeService = new UpdateEscolaUserTypeService(prismaEscolaUserTypeRepository);

    // Executando o service
    const userType = await updateEscolaUserTypeService.execute({
      id,
      name,
    });

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(userType instanceof Error) {
      return res.status(400).send(userType.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(204).send();
  }
}

export { UpdateEscolaUserTypeController };