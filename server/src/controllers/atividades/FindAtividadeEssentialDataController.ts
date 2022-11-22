import { Request, Response } from "express";
import { PrismaAtividadesRepository } from "../../repositories/prisma/atividades/prisma-atividades-repository";
import { FindAtividadeEssentialDataService } from "../../services/atividades/FindAtividadeEssentialDataService";

class FindAtividadeEssentialDataController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaAtividadesRepository = new PrismaAtividadesRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const findAtividadeEssentialDataService = new FindAtividadeEssentialDataService(prismaAtividadesRepository);

    // Executando o service
    const atividade = await findAtividadeEssentialDataService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(atividade instanceof Error) {
      return res.status(400).send(atividade.message);
    }

    // Retornando Professor encontrada para o usuário
    return res.status(200).send(
      {
        atividade
      }
    )
  }
}

export { FindAtividadeEssentialDataController };