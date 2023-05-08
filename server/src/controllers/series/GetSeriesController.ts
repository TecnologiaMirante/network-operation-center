import { Request, Response } from "express";
import { PrismaSeriesRepository } from "../../repositories/prisma/series/prisma-series-repository";
import { GetSeriesService } from "../../services/series/GetSeriesService";

class GetSeriesController {
  async handle(req:Request, res:Response) {
    
    // Repositório do modelo do Prisma
    const prismaSeriesRepository = new PrismaSeriesRepository();

    // Service
    const findSerieService = new GetSeriesService(prismaSeriesRepository);

    // Executando o service
    const series = await findSerieService.execute()

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(series instanceof Error) {
      return res.status(400).send(series.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        series,
      }
    );
  }
}

export { GetSeriesController };