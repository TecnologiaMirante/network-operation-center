import { Request, Response } from "express";
import { PrismaAlunoRespondeAtividadesRepository } from "../../../repositories/prisma/alunos/prisma-aluno-responde-atividade";
import { PrismaAlunosRepository } from "../../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaAtividadesRepository } from "../../../repositories/prisma/atividades/prisma-atividades-repository";
import { PrismaBimestresRepository } from "../../../repositories/prisma/bimestres/prisma-bimestres-repository";
import { CreateAlunoRespondeAtividadeService } from "../../../services/alunos/aluno-responde-atividades/CreateAlunoRespondeAtividadeService";
import { io } from "../../../http";

class CreateAlunoRespondeAtividadeController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { nota, time, id_aluno, id_atividade } = req.body;

    // Repositório do modelo do prisma
    const prismaAlunoRespondeAtividadesRepository = new PrismaAlunoRespondeAtividadesRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaAtividadesRepository = new PrismaAtividadesRepository();
    const prismaBimestresRepository = new PrismaBimestresRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const createAlunoRespondeAtvService = new CreateAlunoRespondeAtividadeService(prismaAlunoRespondeAtividadesRepository, prismaAlunosRepository, prismaAtividadesRepository, prismaBimestresRepository);

    // Executando o service
    const alunoRespondeAtv = await createAlunoRespondeAtvService.execute({
      nota, 
      time,
      id_aluno, 
      id_atividade,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(alunoRespondeAtv instanceof Error) {
      return res.status(400).send(alunoRespondeAtv.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
        data: {
          alunoRespondeAtv
        }
      }
    );
  }
}

export { CreateAlunoRespondeAtividadeController };