import { Request, Response } from "express";
import { PrismaAtividadesRepository } from "../../repositories/prisma/atividades/prisma-atividades-repository";
import { GetAtividadeQuestoesService } from "../../services/atividades/GetAtividadeQuestoesService";

class GetAtividadeQuestoesController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaAtividadesRepository = new PrismaAtividadesRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getAtividadeQuestoesService = new GetAtividadeQuestoesService(prismaAtividadesRepository);

    // Executando o service
    const questoes = await getAtividadeQuestoesService.execute({ id })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(questoes instanceof Error) {
      return res.status(400).send(questoes.message);
    }

    // Retornando Professor encontrada para o usuário
    return res.status(200).send(
      {
        questoes
      }
    )
  }
}

export { GetAtividadeQuestoesController };