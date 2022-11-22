import { Request, Response } from "express";
import { PrismaSeriesRepository } from "../../repositories/prisma/series/prisma-series-repository";
import { CreateSerieService } from "../../services/series/CreateSerieService";
import { PrismaEscolasRepository } from "../../repositories/prisma/escolas/prisma-escolas-repository";

class CreateSerieController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name, id_escola } = req.body;

    // Repositório do modelo do Prisma
    const prismaSeriesRepository = new PrismaSeriesRepository();
    const prismaEscolasRepository = new PrismaEscolasRepository();

    // Service
    const createSerieService = new CreateSerieService(prismaSeriesRepository, prismaEscolasRepository);

    // Executando o service
    const serie = await createSerieService.execute({
      name, 
      id_escola
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(serie instanceof Error) {
      return res.status(400).send(serie.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateSerieController };