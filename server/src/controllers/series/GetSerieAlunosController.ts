import { Request, Response } from "express";
import { PrismaSeriesRepository } from "../../repositories/prisma/series/prisma-series-repository";
import { GetSerieAlunosService } from "../../services/series/GetSerieAlunosService";

class GetSerieAlunosController {
  async handle(req:Request, res:Response) {
    
    // Dados do parâmetro da requisição
    const { id } = req.params;
    
    // Repositório do modelo do Prisma
    const prismaSeriesRepository = new PrismaSeriesRepository();

    // Service
    const getSerieAlunosService = new GetSerieAlunosService(prismaSeriesRepository);

    // Executando o service
    const alunos = await getSerieAlunosService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(alunos instanceof Error) {
      return res.status(400).send(alunos.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      
        alunos,
      
    );
  }
}

export { GetSerieAlunosController };