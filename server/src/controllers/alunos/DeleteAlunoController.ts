import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { DeleteAlunoService } from "../../services/alunos/DeleteAlunoService";

class DeleteAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaAlunosRepository = new PrismaAlunosRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const deleteAlunoService = new DeleteAlunoService(prismaAlunosRepository);

    // Executando o service
    const aluno = await deleteAlunoService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(aluno instanceof Error) {
      return res.status(400).send(aluno.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteAlunoController };