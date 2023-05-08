import { Request, Response } from "express";
import { PrismaAtividadeHasQuestoesRepository } from "../../../repositories/prisma/atividades/prisma-atividade-has-questoes-repository";
import { GetAtividadeHasQuestoesService } from "../../../services/atividades/atividade-has-questoes/GetAtividadeHasQuestoesService";

class GetAtividadeHasQuestoesController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo do prisma
    const prismaAtividadeHasQuestoesRepository = new PrismaAtividadeHasQuestoesRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getAtividadeService = new GetAtividadeHasQuestoesService(prismaAtividadeHasQuestoesRepository);

    // Executando o service
    const atividade = await getAtividadeService.execute()

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

export { GetAtividadeHasQuestoesController };