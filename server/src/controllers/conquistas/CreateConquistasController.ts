import { Request, Response } from "express";
import { PrismaConquistasRepository } from "../../repositories/prisma/conquistas/prisma-conquistas-repository";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { RelateAllAlunosAlunoHasConquistasService } from "../../services/conquistas/aluno_has_conquistas/RelateAllAlunos-AlunoHasConquistasService";
import { CreateConquistasService } from "../../services/conquistas/CreateConquistasService";
import { PrismaAlunoHasConquistasRepository } from "../../repositories/prisma/conquistas/prisma-aluno-has-conquistas-repository";

class CreateConquistasController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name, description, type, objective, objective_secondary, discipline, difficulty  } = req.body;

    // Repositório do modelo secretaria do Prisma
    const prismaConquistasRepository = new PrismaConquistasRepository();

    // Service da Secretaria
    const createConquistasService = new CreateConquistasService(prismaConquistasRepository);

    // Executando o service
    const conquista = await createConquistasService.execute({
      name, 
      description,
      type, 
      objective, 
      objective_secondary, 
      discipline, 
      difficulty
    })

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