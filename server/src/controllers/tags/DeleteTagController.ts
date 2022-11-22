import { Request, Response } from "express";
import { PrismaTagsRepository } from "../../repositories/prisma/tags/prisma-tags-repository";
import { DeleteTagService } from "../../services/tags/DeleteTagService";

class DeleteTagController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo tag do Prisma
    const prismaTagsRepository = new PrismaTagsRepository();

    // Service da tag
    const deleteTagService = new DeleteTagService(prismaTagsRepository);

    // Executando o service
    const tag = await deleteTagService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(tag instanceof Error) {
      return res.status(400).send(tag.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(204).end();
  }
}

export { DeleteTagController };