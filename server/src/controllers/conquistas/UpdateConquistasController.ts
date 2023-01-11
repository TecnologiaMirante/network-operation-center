import { Request, Response } from "express";
import { PrismaConquistasRepository } from "../../repositories/prisma/conquistas/prisma-conquistas-repository";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { RelateAllAlunosAlunoHasConquistasService } from "../../services/conquistas/aluno_has_conquistas/RelateAllAlunos-AlunoHasConquistasService";
import { CreateConquistasService } from "../../services/conquistas/CreateConquistasService";
import { PrismaAlunoHasConquistasRepository } from "../../repositories/prisma/conquistas/prisma-aluno-has-conquistas-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { CreateConquistaEspecificaService } from "../../services/conquistas/CreateConquistaEspecificaService";
import { CreateConquistaGeralService } from "../../services/conquistas/CreateConquistaGeralService";
import { UpdateConquistasService } from "../../services/conquistas/UpdateConquistasService";

class UpdateConquistasController {
  async handle(req:Request, res:Response) {

    const { id } = req.params;

    // Dados do corpo da requisição
    const { name, description, type, domain, objective, objective_secondary, id_disciplina, difficulty  } = req.body;

    // Repositório do modelo secretaria do Prisma
    const prismaConquistasRepository = new PrismaConquistasRepository();

    let conquista;

    // TODO: Chama o service da conquista geral

    const updateConquistasService = new UpdateConquistasService(prismaConquistasRepository);

    conquista = await updateConquistasService.execute({
      id,
      name, 
      description,
      type, 
      domain,
      objective, 
      objective_secondary, 
      id_disciplina, 
      difficulty
    });

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(conquista instanceof Error) {
      return res.status(400).send(conquista.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateConquistasController };