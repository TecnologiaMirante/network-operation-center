import { Request, Response } from "express";
import { PrismaSerieHasDisciplinasRepository } from "../../../repositories/prisma/series/prisma-serie-has-disciplinas-repository";
import { PrismaSeriesRepository } from "../../../repositories/prisma/series/prisma-series-repository";
import { PrismaDisciplinasRepository } from "../../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { UpdateSerieHasDisplinaService } from "../../../services/series/serie-has-disciplinas/UpdateSerieHasDisciplinaService";

class UpdateSerieHasDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { id_serie, id_disciplina } = req.body;

    // Repositório do modelo do Prisma
    const prismaSerieHasDisciplinasRepository = new PrismaSerieHasDisciplinasRepository();
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
    const prismaSeriesRepository = new PrismaSeriesRepository();

    // Service
    const createSerieService = new UpdateSerieHasDisplinaService(prismaSerieHasDisciplinasRepository, prismaSeriesRepository, prismaDisciplinasRepository);

    // Executando o service
    const serie = await createSerieService.execute({
      id,  
      id_serie, 
      id_disciplina
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(serie instanceof Error) {
      return res.status(400).send(serie.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateSerieHasDisciplinaController };