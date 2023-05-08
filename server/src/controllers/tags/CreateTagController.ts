import { Request, Response } from "express";
import { PrismaTagsRepository } from "../../repositories/prisma/tags/prisma-tags-repository";
import { CreateTagService } from "../../services/tags/CreateTagService";

class CreateTagController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name } = req.body;

    // Repositório do modelo tag do Prisma
    const prismaTagsRepository = new PrismaTagsRepository();

    // Service da tag
    const createTagService = new CreateTagService(prismaTagsRepository);

    // Executando o service
    const tag = await createTagService.execute({
      name,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(tag instanceof Error) {
      return res.status(400).send(tag.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Tag criada com sucesso!",
      }
    );
  }
}

export { CreateTagController };