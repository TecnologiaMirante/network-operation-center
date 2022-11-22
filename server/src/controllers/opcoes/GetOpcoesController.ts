import { Request, Response } from "express";
import { PrismaOpcoesRepository } from "../../repositories/prisma/opcoes/prisma-opcoes-repository";
import { GetOpcoesService } from "../../services/opcoes/GetOpcoesService";

class GetOpcoesController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo secretaria do Prisma
    const prismaOpcoesRepository = new PrismaOpcoesRepository();

    // Service da Secretaria
    const getOpcoesService = new GetOpcoesService(prismaOpcoesRepository);

    // Executando o service
    const opcoes = await getOpcoesService.execute()

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(opcoes instanceof Error) {
      return res.status(400).send(opcoes.message);
    }

    // Retornando questão encontrada para o usuário
    return res.status(200).send(
      {
        opcoes
      }
    )
  }
}

export { GetOpcoesController };