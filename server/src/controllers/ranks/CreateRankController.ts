import { Request, Response } from "express";
import { PrismaRanksRepository } from "../../repositories/prisma/ranks/prisma-ranks-repository";
import { CreateRankService } from "../../services/ranks/CreateRankService";

class CreateRankController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_aluno, points } = req.body;

    // Repositório do modelo do prisma
    const prismaRanksRepository = new PrismaRanksRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const createRankService = new CreateRankService(prismaRanksRepository);

    // Executando o service
    const rank = await createRankService.execute({
        id_aluno, 
        points
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(rank instanceof Error) {
      return res.status(400).send(rank.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Rank criado com sucesso!",
      }
    );
  }
}

export { CreateRankController };