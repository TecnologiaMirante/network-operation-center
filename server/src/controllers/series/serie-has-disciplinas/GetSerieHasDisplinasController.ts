import { Request, Response } from "express";
import { PrismaSerieHasDisciplinasRepository } from "../../../repositories/prisma/series/prisma-serie-has-disciplinas-repository";
import { GetSerieHasDisplinasService } from "../../../services/series/serie-has-disciplinas/GetSerieHasDisciplinasService";

class GetSerieHasDisciplinaController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo do Prisma
    const prismaSerieHasDisciplinasRepository = new PrismaSerieHasDisciplinasRepository();

    // Service
    const getSeriesService = new GetSerieHasDisplinasService(prismaSerieHasDisciplinasRepository);

    // Executando o service
    const series = await getSeriesService.execute()

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

export { GetSerieHasDisciplinaController };