import { Request, Response } from "express";
import { PrismaAtividadeHasQuestoesRepository } from "../../../repositories/prisma/atividades/prisma-atividade-has-questoes-repository";
import { PrismaAtividadesRepository } from "../../../repositories/prisma/atividades/prisma-atividades-repository";
import { PrismaQuestoesRepository } from "../../../repositories/prisma/questoes/prisma-questoes-repository";
import { UpdateAtividadeHasQuestoesService } from "../../../services/atividades/atividade-has-questoes/UpdateAtividadeHasQuestoesService";

class UpdateAtividadeHasQuestoesController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { id_questao, id_atividade } = req.body;

    // Repositório do modelo do prisma
    const prismaAtividadeHasQuestoesRepository = new PrismaAtividadeHasQuestoesRepository();
    const prismaAtividadesRepository = new PrismaAtividadesRepository();
    const prismaQuestoesRepository = new PrismaQuestoesRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const createAtividadeService = new UpdateAtividadeHasQuestoesService(prismaAtividadesRepository, prismaQuestoesRepository, prismaAtividadeHasQuestoesRepository);

    // Executando o service
    const atividade = await createAtividadeService.execute({
      id,
      id_questao,
      id_atividade
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(atividade instanceof Error) {
      return res.status(400).send(atividade.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateAtividadeHasQuestoesController };