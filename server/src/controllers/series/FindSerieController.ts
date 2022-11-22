import { Request, Response } from "express";
import { PrismaSeriesRepository } from "../../repositories/prisma/series/prisma-series-repository";
import { FindSerieService } from "../../services/series/FindSerieService";

class FindSerieController {
  async handle(req:Request, res:Response) {
    
    // Dados do parâmetro da requisição
    const { id } = req.params;
    
    // Dados do corpo da requisição
    const { name, id_escola } = req.body;

    // Repositório do modelo do Prisma
    const prismaSeriesRepository = new PrismaSeriesRepository();

    // Service
    const findSerieService = new FindSerieService(prismaSeriesRepository);

    // Executando o service
    const serie = await findSerieService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(serie instanceof Error) {
      return res.status(400).send(serie.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        serie,
      }
    );
  }
}

export { FindSerieController };