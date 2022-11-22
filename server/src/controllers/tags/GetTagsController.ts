import { Request, Response } from "express";
import { PrismaTagsRepository } from "../../repositories/prisma/tags/prisma-tags-repository";
import { GetTagsService } from "../../services/tags/GetTagsService";

class GetTagsController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo tag do Prisma
    const prismaTagsRepository = new PrismaTagsRepository();

    // Service da tag
    const getTagsService = new GetTagsService(prismaTagsRepository);

    // Executando o service
    const tags = await getTagsService.execute()

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(tags instanceof Error) {
      return res.status(400).send(tags.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        tags,
      }
    );
  }
}

export { GetTagsController };