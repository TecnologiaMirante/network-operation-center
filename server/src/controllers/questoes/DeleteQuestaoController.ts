import { Request, Response } from "express";
import { PrismaQuestoesRepository } from "../../repositories/prisma/questoes/prisma-questoes-repository";
import { DeleteQuestaoService } from "../../services/questoes/DeleteQuestaoService";

class DeleteQuestaoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição    
    const { id } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaQuestoesRepository = new PrismaQuestoesRepository();

    // Service da Secretaria
    const deleteQuestaoService = new DeleteQuestaoService(prismaQuestoesRepository);

    // Executando o service
    const questao = await deleteQuestaoService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(questao instanceof Error) {
      return res.status(400).send(questao.message);
    }

    // Retornando Secretaria encontrada para o usuário
    return res.status(204).send()
  }
}

export { DeleteQuestaoController };