import { Request, Response } from "express";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { CreateDisciplinaService } from "../../services/disciplinas/CreateDisciplinaService";
import { PrismaEscolasRepository } from "../../repositories/prisma/escolas/prisma-escolas-repository";

class CreateDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name, code, status, id_escola } = req.body;

    // Repositório do modelo do Prisma
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
    const prismaEscolasRepository = new PrismaEscolasRepository();

    // Service
    const createDisciplinaService = new CreateDisciplinaService(prismaDisciplinasRepository, prismaEscolasRepository);

    // Executando o service
    const Disciplina = await createDisciplinaService.execute({
      name, 
      code,
      status,
      id_escola
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(Disciplina instanceof Error) {
      return res.status(400).send(Disciplina.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateDisciplinaController };