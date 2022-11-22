import { Request, Response } from "express";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { PrismaQuestoesRepository } from "../../repositories/prisma/questoes/prisma-questoes-repository";
import { UpdateQuestaoService } from "../../services/questoes/UpdateQuestaoService";

class UpdateQuestaoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição    
    const { id } = req.params;

    // Dados do corpo da requisição
    const { title, question_type, grade, difficulty, id_disciplina } = req.body;

    // Repositório do modelo secretaria do Prisma
    const prismaQuestoesRepository = new PrismaQuestoesRepository();
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

    // Service da Secretaria
    const updateQuestaoService = new UpdateQuestaoService(prismaQuestoesRepository, prismaDisciplinasRepository);

    // Executando o service
    const questao = await updateQuestaoService.execute({
      id,
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
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateQuestaoController };