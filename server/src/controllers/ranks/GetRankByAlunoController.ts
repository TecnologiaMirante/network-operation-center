import { Request, Response } from "express";
import { PrismaRanksRepository } from "../../repositories/prisma/ranks/prisma-ranks-repository";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { GetRankByAlunoService } from "../../services/ranks/GetRankByalunoService";

class GetRankByAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_aluno } = req.params;

    // Repositório do modelo do prisma
    const prismaRanksRepository = new PrismaRanksRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getRankByAlunoService = new GetRankByAlunoService(prismaRanksRepository, prismaAlunosRepository);

    // Executando o service
    const rank = await getRankByAlunoService.execute({
      id_aluno,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(rank instanceof Error) {
      return res.status(400).send(rank.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
        rank
    );
  }
}

export { GetRankByAlunoController };