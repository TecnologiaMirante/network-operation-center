import { Request, Response } from "express";
import { PrismaQuestoesRepository } from "../../repositories/prisma/questoes/prisma-questoes-repository";
import { FindQuestaoService } from "../../services/questoes/FindQuestaoService";

class FindQuestaoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição    
    const { id } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaQuestoesRepository = new PrismaQuestoesRepository();

    // Service da Secretaria
    const findQuestaoService = new FindQuestaoService(prismaQuestoesRepository);

    // Executando o service
    const questao = await findQuestaoService.execute({
      id,
    })

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

export { FindQuestaoController };