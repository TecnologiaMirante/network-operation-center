import { Request, Response } from "express";
import { PrismaTurmasRepository } from "../../repositories/prisma/turmas/prisma-turmas-repository";
import { PrismaSeriesRepository } from "../../repositories/prisma/series/prisma-series-repository";
import { CreateTurmaService } from "../../services/turmas/CreateTurmaService";

class CreateTurmaController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name, code, shift, year, status, id_serie } = req.body;

    // Repositório do modelo do Prisma
    const prismaTurmasRepository = new PrismaTurmasRepository();
    const prismaSeriesRepository = new PrismaSeriesRepository();

    // Service
    const createTurmaService = new CreateTurmaService(prismaTurmasRepository, prismaSeriesRepository);

    // Executando o service
    const turma = await createTurmaService.execute({
      name, 
      code,
      shift, 
      year, 
      status,
      id_serie
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(turma instanceof Error) {
      return res.status(400).send(turma.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateTurmaController };