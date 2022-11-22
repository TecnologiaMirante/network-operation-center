import { Request, Response } from "express";
import { PrismaRanksRepository } from "../../repositories/prisma/ranks/prisma-ranks-repository";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { GetRankService } from "../../services/ranks/GetRankService";

class GetRankController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo do prisma
    const prismaRanksRepository = new PrismaRanksRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getRankService = new GetRankService(prismaRanksRepository);

    // Executando o service
    const rank = await getRankService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(rank instanceof Error) {
      return res.status(400).send(rank.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
        {rank}
    );
  }
}

export { GetRankController };