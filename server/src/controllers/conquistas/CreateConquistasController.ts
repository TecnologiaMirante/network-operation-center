import { Request, Response } from "express";
import { PrismaConquistasRepository } from "../../repositories/prisma/conquistas/prisma-conquistas-repository";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { RelateAllAlunosAlunoHasConquistasService } from "../../services/conquistas/aluno_has_conquistas/RelateAllAlunos-AlunoHasConquistasService";
import { CreateConquistasService } from "../../services/conquistas/CreateConquistasService";
import { PrismaAlunoHasConquistasRepository } from "../../repositories/prisma/conquistas/prisma-aluno-has-conquistas-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { CreateConquistaEspecificaService } from "../../services/conquistas/CreateConquistaEspecificaService";
import { CreateConquistaGeralService } from "../../services/conquistas/CreateConquistaGeralService";

class CreateConquistasController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name, description, color, icon, type, domain, objective, objective_secondary, id_disciplina, difficulty  } = req.body;

    // Repositório do modelo secretaria do Prisma
    const prismaConquistasRepository = new PrismaConquistasRepository();

    // * As conquistas podem ser GERAIS ou ESPECÍFICAS por matéria
    // ? Cada uma possui seu próprio service

    let conquista;

    if (domain === "specific") {
      // TODO: Chama o service da conquista específica
      
      const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
      const createConquistaEspecificaService = new CreateConquistaEspecificaService(prismaConquistasRepository, prismaDisciplinasRepository);

      conquista= await createConquistaEspecificaService.execute({
        name, 
        description,
        color,
        icon,
        type, 
        domain,
        objective, 
        objective_secondary, 
        id_disciplina, 
        difficulty
      });
    } 

    else if (domain === "general") {
      // TODO: Chama o service da conquista geral

      const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
      const createConquistaGeralService = new CreateConquistaGeralService(prismaConquistasRepository);

      conquista = await createConquistaGeralService.execute({
        name, 
        description,
        color,
        icon,
        type, 
        domain,
        objective, 
        objective_secondary, 
        id_disciplina, 
        difficulty
      });
    }

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(conquista instanceof Error) {
      return res.status(400).send(conquista.message);
    }

    // Relacionando os alunos com a conquista recém criada
    const prismaAlunoHasConquistaRepository = new PrismaAlunoHasConquistasRepository();

    const relateAlunoHasConquistasService = new RelateAllAlunosAlunoHasConquistasService(prismaAlunoHasConquistaRepository, prismaConquistasRepository)

    await relateAlunoHasConquistasService.execute({
      id_conquista: Object(conquista).id,
    })

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateConquistasController };