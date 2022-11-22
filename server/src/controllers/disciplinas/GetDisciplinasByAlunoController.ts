import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { GetDisciplinasByAlunoService } from "../../services/disciplinas/GetDisciplinasByAlunoService";

class GetDisciplinasByAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id_aluno } = req.params;

    // Repositório do modelo do Prisma
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();

    // Service
    const getDisciplinasByAlunoService = new GetDisciplinasByAlunoService(prismaDisciplinasRepository, prismaAlunosRepository);

    // Executando o service
    const disciplinas = await getDisciplinasByAlunoService.execute({
      id_aluno,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(disciplinas instanceof Error) {
      return res.status(400).send(disciplinas.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
        {disciplinas},
    );
  }
}

export { GetDisciplinasByAlunoController };