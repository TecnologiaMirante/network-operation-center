import { Request, Response } from "express";
import { PrismaTagsRepository } from "../../repositories/prisma/tags/prisma-tags-repository";
import { UpdateTagService } from "../../services/tags/UpdateTagService";

class UpdateTagController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { name } = req.body;

    // Repositório do modelo tag do Prisma
    const prismaTagsRepository = new PrismaTagsRepository();

    // Service da tag
    const updateTagService = new UpdateTagService(prismaTagsRepository);

    // Executando o service
    const tag = await updateTagService.execute({
      id,
      name,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(tag instanceof Error) {
      return res.status(400).send(tag.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Tag atualizada com sucesso!",
      }
    );
  }
}

export { UpdateTagController };