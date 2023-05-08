import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaEscolaUsersRepository } from "../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { PrismaTurmasRepository } from "../../repositories/prisma/turmas/prisma-turmas-repository";
import { UpdateAlunoService } from "../../services/alunos/UpdateAlunoService";

class UpdateAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { id_escola_user, id_turma  } = req.body;

    // Repositório do modelo do prisma
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaEscolasUsersRepository = new PrismaEscolaUsersRepository();
    const prismaTurmasRepository = new PrismaTurmasRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const updateAlunoService = new UpdateAlunoService(prismaAlunosRepository, prismaEscolasUsersRepository, prismaTurmasRepository);

    // Executando o service
    const aluno = await updateAlunoService.execute({
      id,
      id_escola_user,
      id_turma
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(aluno instanceof Error) {
      return res.status(400).send(aluno.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateAlunoController };