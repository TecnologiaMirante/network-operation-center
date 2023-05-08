import { Request, Response } from "express";
import { PrismaAnotacaoHasTagsRepository } from "../../../repositories/prisma/anotacoes/prisma-anotacao-has-tags-repository";
import { FindAnotacaoHasTagsService } from "../../../services/anotacoes/anotacao-has-tags/FindAnotacaoHasTagsService";

class FindAnotacaoHasTagsController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetros da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const pPrismaAnotacaoHasTagsRepository = new PrismaAnotacaoHasTagsRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const findAnotacaoHasTagsService = new FindAnotacaoHasTagsService(pPrismaAnotacaoHasTagsRepository);

    // Executando o service
    const anotacao = await findAnotacaoHasTagsService.execute({
      id
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(anotacao instanceof Error) {
      return res.status(400).send(anotacao.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        anotacao,
      }
    );
  }
}

export { FindAnotacaoHasTagsController };