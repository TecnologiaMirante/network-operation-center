import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { FindAlunoService } from "../../services/alunos/FindAlunoService";

class FindAlunoController {
  async handle(req:Request, res:Response) {
    
    // Dados do corpo da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaAlunosRepository = new PrismaAlunosRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const findAlunoService = new FindAlunoService(prismaAlunosRepository);

    // Executando o service
    const aluno = await findAlunoService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(aluno instanceof Error) {
      return res.status(400).send(aluno.message);
    }

    // Retornando aluno encontrado para o usuário
    return res.status(200).send(
      {
        aluno
      }
    )
  }
}

export { FindAlunoController };