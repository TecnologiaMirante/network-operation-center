import { Request, Response } from "express";
import { PrismaSeriesRepository } from "../../repositories/prisma/series/prisma-series-repository";
import { DeleteSerieService } from "../../services/series/DeleteSerieService";

class DeleteSerieController {
  async handle(req:Request, res:Response) {
    
    // Dados do parâmetro da requisição
    const { id } = req.params;
    
    // Repositório do modelo do Prisma
    const prismaSeriesRepository = new PrismaSeriesRepository();

    // Service
    const deleteSerieService = new DeleteSerieService(prismaSeriesRepository);

    // Executando o service
    const serie = await deleteSerieService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(serie instanceof Error) {
      return res.status(400).send(serie.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteSerieController };