import { Request, Response } from "express";
import { PrismaAtividadesRepository } from "../../repositories/prisma/atividades/prisma-atividades-repository";
import { GetAtividadesByDisciplinaService } from "../../services/atividades/GetAtividadesByDisciplinaService";

class GetAtividadesByDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id_disciplina } = req.params;

    // Repositório do modelo do prisma
    const prismaAtividadesRepository = new PrismaAtividadesRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getAtividadesByDisciplinaService = new GetAtividadesByDisciplinaService(prismaAtividadesRepository);

    // Executando o service
    const atividades = await getAtividadesByDisciplinaService.execute({
      id_disciplina,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(atividades instanceof Error) {
      return res.status(400).send(atividades.message);
    }

    // Retornando Professor encontrada para o usuário
    return res.status(200).send(
      {
        atividades
      }
    )
  }
}

export { GetAtividadesByDisciplinaController };