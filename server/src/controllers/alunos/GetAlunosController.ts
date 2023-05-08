import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { GetAlunosService } from "../../services/alunos/GetAlunosService";

class GetAlunosController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo do prisma
    const prismaAlunosRepository = new PrismaAlunosRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getAlunosService = new GetAlunosService(prismaAlunosRepository);

    // Executando o service
    const alunos = await getAlunosService.execute()

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(alunos instanceof Error) {
      return res.status(400).send(alunos.message);
    }

    // Retornando aluno encontrado para o usuário
    return res.status(200).send(
      {
        alunos
      }
    )
  }
}

export { GetAlunosController };