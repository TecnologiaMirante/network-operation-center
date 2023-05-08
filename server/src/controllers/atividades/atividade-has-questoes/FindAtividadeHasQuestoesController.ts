import { Request, Response } from "express";
import { PrismaAtividadeHasQuestoesRepository } from "../../../repositories/prisma/atividades/prisma-atividade-has-questoes-repository";
import { FindAtividadeHasQuestoesService } from "../../../services/atividades/atividade-has-questoes/FindAtividadeHasQuestoesService";

class FindAtividadeHasQuestoesController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaAtividadeHasQuestoesRepository = new PrismaAtividadeHasQuestoesRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const findAtividadeHasQuestoesService = new FindAtividadeHasQuestoesService(prismaAtividadeHasQuestoesRepository);

    // Executando o service
    const atividade = await findAtividadeHasQuestoesService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(atividade instanceof Error) {
      return res.status(400).send(atividade.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:atividade,
      }
    );
  }
}

export { FindAtividadeHasQuestoesController };