import { Request, Response } from "express";
import { PrismaConquistasRepository } from "../../repositories/prisma/conquistas/prisma-conquistas-repository";
import { PrismaAlunoHasConquistasRepository } from "../../repositories/prisma/conquistas/prisma-aluno-has-conquistas-repository";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { RelateAllAlunosAlunoHasConquistasService } from "../../services/conquistas/aluno_has_conquistas/RelateAllAlunos-AlunoHasConquistasService";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { CreateConquistaEspecificaService } from "../../services/conquistas/CreateConquistaEspecificaService";
import { CreateConquistaGeralService } from "../../services/conquistas/CreateConquistaGeralService";
import { GetAlunoHasConquistasByAlunoService } from "../../services/conquistas/aluno_has_conquistas/GetAlunoHasConquistasGetByAlunoService";

class GetAlunoHasConquistasByAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_aluno } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaAlunoHasConquistasRepository = new PrismaAlunoHasConquistasRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();

    const getAlunoHasConquistasByAlunoService = new GetAlunoHasConquistasByAlunoService(prismaAlunoHasConquistasRepository, prismaAlunosRepository);

    const conquistas = await getAlunoHasConquistasByAlunoService.execute({
      id_aluno
    });

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(conquistas instanceof Error) {
      return res.status(400).send(conquistas.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        conquistas,
      }
    );
  }
}

export { GetAlunoHasConquistasByAlunoController };