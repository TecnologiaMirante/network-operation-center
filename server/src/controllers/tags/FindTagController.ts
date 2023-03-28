import { Request, Response } from "express";
import { PrismaTagsRepository } from "../../repositories/prisma/tags/prisma-tags-repository";
import { FindTagService } from "../../services/tags/FindTagService";

class FindTagController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo tag do Prisma
    const prismaTagsRepository = new PrismaTagsRepository();

    // Service da tag
    const findTagService = new FindTagService(prismaTagsRepository);

    // Executando o service
    const tag = await findTagService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(tag instanceof Error) {
      return res.status(400).send(tag.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        tag,
      }
    );
  }
}

export { FindTagController };