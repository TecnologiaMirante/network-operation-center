import { Request, Response } from "express";
import { PrismaAulasRepository } from "../../repositories/prisma/aulas/prisma-aulas-repository";
import { GetLastAulasService } from "../../services/aulas/GetLastAulasService";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";

class GetLastAulasController {
  async handle(req:Request, res:Response) {
    // Dados do parâmetro da requisição
    const { id_aluno } = req.params;

    // Repositório do modelo do Prisma
    const prismaAulasRepository = new PrismaAulasRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();

    // Service
    const getLastAulasService = new GetLastAulasService(prismaAulasRepository, prismaAlunosRepository);

    // Executando o service
    const aulas = await getLastAulasService.execute({
      id_aluno,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(aulas instanceof Error) {
      return res.status(400).send(aulas.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(aulas);
  }
}

export { GetLastAulasController };