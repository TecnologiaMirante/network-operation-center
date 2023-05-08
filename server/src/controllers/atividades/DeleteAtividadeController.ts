import { Request, Response } from "express";
import { PrismaAtividadesRepository } from "../../repositories/prisma/atividades/prisma-atividades-repository";
import { DeleteAtividadeService } from "../../services/atividades/DeleteAtividadeService";

class DeleteAtividadeController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaAtividadesRepository = new PrismaAtividadesRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const deleteAtividadeService = new DeleteAtividadeService(prismaAtividadesRepository);

    // Executando o service
    const atividade = await deleteAtividadeService.execute({
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

export { DeleteAtividadeController };