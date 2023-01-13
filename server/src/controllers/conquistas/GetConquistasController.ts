import { Request, Response } from "express";
import { PrismaConquistasRepository } from "../../repositories/prisma/conquistas/prisma-conquistas-repository";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { RelateAllAlunosAlunoHasConquistasService } from "../../services/conquistas/aluno_has_conquistas/RelateAllAlunos-AlunoHasConquistasService";
import { CreateConquistasService } from "../../services/conquistas/CreateConquistasService";
import { PrismaAlunoHasConquistasRepository } from "../../repositories/prisma/conquistas/prisma-aluno-has-conquistas-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { CreateConquistaEspecificaService } from "../../services/conquistas/CreateConquistaEspecificaService";
import { GetConquistasService } from "../../services/conquistas/GetConquistasService";

class GetConquistasController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo secretaria do Prisma
    const prismaConquistasRepository = new PrismaConquistasRepository();
    // * As conquistas podem ser GERAIS ou ESPECÍFICAS por matéria
    // ? Cada uma possui seu próprio service

    const getConquistasService = new GetConquistasService(prismaConquistasRepository);

    const conquistas = await getConquistasService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(conquistas instanceof Error) {
      return res.status(400).send(conquistas.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        conquistas
      }
    );
  }
}

export { GetConquistasController };