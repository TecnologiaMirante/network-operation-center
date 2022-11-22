import { Request, Response } from "express";
import { PrismaSerieHasDisciplinasRepository } from "../../../repositories/prisma/series/prisma-serie-has-disciplinas-repository";
import { PrismaSeriesRepository } from "../../../repositories/prisma/series/prisma-series-repository";
import { PrismaDisciplinasRepository } from "../../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { CreateSerieHasDisplinaService } from "../../../services/series/serie-has-disciplinas/CreateSerieHasDisciplinaService";

class CreateSerieHasDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_serie, id_disciplina } = req.body;

    // Repositório do modelo do Prisma
    const prismaSerieHasDisciplinasRepository = new PrismaSerieHasDisciplinasRepository();
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
    const prismaSeriesRepository = new PrismaSeriesRepository();

    // Service
    const createSerieService = new CreateSerieHasDisplinaService(prismaSerieHasDisciplinasRepository, prismaSeriesRepository, prismaDisciplinasRepository);

    // Executando o service
    const serie = await createSerieService.execute({
        id_serie, 
        id_disciplina
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

export { CreateSerieHasDisciplinaController };