import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaEscolaUsersRepository } from "../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { PrismaTurmasRepository } from "../../repositories/prisma/turmas/prisma-turmas-repository";
import { CreateAlunoService } from "../../services/alunos/CreateAlunoService";

class CreateAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_escola_user, id_turma  } = req.body;

    // Repositório do modelo do prisma
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaEscolasUsersRepository = new PrismaEscolaUsersRepository();
    const prismaTurmasRepository = new PrismaTurmasRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const createAlunoService = new CreateAlunoService(prismaAlunosRepository, prismaEscolasUsersRepository, prismaTurmasRepository);

    // Executando o service
    const aluno = await createAlunoService.execute({
      id_escola_user,
      id_turma
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(aluno instanceof Error) {
      return res.status(400).send(aluno.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Aluno criado com sucesso!",
      }
    );
  }
}

export { CreateAlunoController };