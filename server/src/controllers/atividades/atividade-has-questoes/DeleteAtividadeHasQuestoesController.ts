import { Request, Response } from "express";
import { PrismaAtividadeHasQuestoesRepository } from "../../../repositories/prisma/atividades/prisma-atividade-has-questoes-repository";
import { DeleteAtividadeHasQuestoesService } from "../../../services/atividades/atividade-has-questoes/DeleteAtividadeHasQuestoesService";

class DeleteAtividadeHasQuestoesController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaAtividadeHasQuestoesRepository = new PrismaAtividadeHasQuestoesRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const deleteAtividadeHasQuestoesService = new DeleteAtividadeHasQuestoesService(prismaAtividadeHasQuestoesRepository);

    // Executando o service
    const atividade = await deleteAtividadeHasQuestoesService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(atividade instanceof Error) {
      return res.status(400).send(atividade.message);
    }

    // Retornando Secretaria encontrada para o usuário
    return res.status(204).send()
  }
}

export { DeleteAtividadeHasQuestoesController };