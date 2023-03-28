import { Request, Response } from "express";
import { PrismaAulasRepository } from "../../repositories/prisma/aulas/prisma-aulas-repository";
import { GetAulasBySerieService } from "../../services/aulas/GetAulasBySerieService";

class GetAulasBySerieController {
  async handle(req:Request, res:Response) {
    // Dados do parâmetro da requisição
    const { id_serie } = req.params;

    // Repositório do modelo do Prisma
    const prismaAulasRepository = new PrismaAulasRepository();

    // Service
    const getAulasBySerieService = new GetAulasBySerieService(prismaAulasRepository);

    // Executando o service
    const aulas = await getAulasBySerieService.execute({
      id_serie,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(aulas instanceof Error) {
      return res.status(400).send(aulas.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        aulas,
      }
    );
  }
}

export { GetAulasBySerieController };