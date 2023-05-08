import { Request, Response } from "express";
import { PrismaQuestoesRepository } from "../../repositories/prisma/questoes/prisma-questoes-repository";
import { GetQuestoesService } from "../../services/questoes/GetQuestoesService";

class GetQuestoesController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição    
    const { id } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaQuestoesRepository = new PrismaQuestoesRepository();

    // Service da Secretaria
    const getQuestoesService = new GetQuestoesService(prismaQuestoesRepository);

    // Executando o service
    const questao = await getQuestoesService.execute()

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(questao instanceof Error) {
      return res.status(400).send(questao.message);
    }

    // Retornando questão encontrada para o usuário
    return res.status(200).send(
      {
        questao
      }
    )
  }
}

export { GetQuestoesController };