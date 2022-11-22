import { Request, Response } from "express";
import { PrismaAulasRepository } from "../../repositories/prisma/aulas/prisma-aulas-repository";
import { DeleteAulaService } from "../../services/aulas/DeleteAulaService";

class DeleteAulaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaAulasRepository = new PrismaAulasRepository();

    // Service
    const deleteAulaService = new DeleteAulaService(prismaAulasRepository);

    // Executando o service
    const aula = await deleteAulaService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(aula instanceof Error) {
      return res.status(400).send(aula.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteAulaController };