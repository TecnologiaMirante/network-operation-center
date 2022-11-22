import { Request, Response } from "express";
import { PrismaQuestoesRepository } from "../../repositories/prisma/questoes/prisma-questoes-repository";
import { CreateQuestaoService } from "../../services/questoes/CreateQuestaoService";

class CreateQuestaoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { title, question_type, grade, difficulty, id_disciplina  } = req.body;

    // Repositório do modelo secretaria do Prisma
    const prismaQuestoesRepository = new PrismaQuestoesRepository();

    // Service da Secretaria
    const createQuestaoService = new CreateQuestaoService(prismaQuestoesRepository);

    // Executando o service
    const questao = await createQuestaoService.execute({
      title,
      question_type,
      grade, 
      difficulty, 
      id_disciplina
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(questao instanceof Error) {
      return res.status(400).send(questao.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateQuestaoController };