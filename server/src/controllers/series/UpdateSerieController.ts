import { Request, Response } from "express";
import { PrismaSeriesRepository } from "../../repositories/prisma/series/prisma-series-repository";
import { UpdateSerieService } from "../../services/series/UpdateSerieService";
import { PrismaEscolasRepository } from "../../repositories/prisma/escolas/prisma-escolas-repository";

class UpdateSerieController {
  async handle(req:Request, res:Response) {
    
    // Dados do parâmetro da requisição
    const { id } = req.params;
    
    // Dados do corpo da requisição
    const { name, id_escola } = req.body;

    // Repositório do modelo do Prisma
    const prismaSeriesRepository = new PrismaSeriesRepository();
    const prismaEscolasRepository = new PrismaEscolasRepository();

    // Service
    const updateSerieService = new UpdateSerieService(prismaSeriesRepository, prismaEscolasRepository);

    // Executando o service
    const serie = await updateSerieService.execute({
      id,
      name, 
      id_escola
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

export { UpdateSerieController };