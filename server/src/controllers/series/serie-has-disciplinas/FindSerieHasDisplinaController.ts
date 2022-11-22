import { Request, Response } from "express";
import { PrismaSerieHasDisciplinasRepository } from "../../../repositories/prisma/series/prisma-serie-has-disciplinas-repository";
import { FindSerieHasDisplinaService } from "../../../services/series/serie-has-disciplinas/FindSerieHasDisciplinaService";

class FindSerieHasDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaSerieHasDisciplinasRepository = new PrismaSerieHasDisciplinasRepository();

    // Service
    const findSerieService = new FindSerieHasDisplinaService(prismaSerieHasDisciplinasRepository);

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

export { FindSerieHasDisciplinaController };