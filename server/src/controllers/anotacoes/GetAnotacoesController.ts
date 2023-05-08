import { Request, Response } from "express";
import { PrismaAnotacoesRepository } from "../../repositories/prisma/anotacoes/prisma-anotacoes-repository";
import { GetAnotacoesService } from "../../services/anotacoes/GetAnotacoesService";

class GetAnotacoesController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo do prisma
    const prismaAnotacoesRepository = new PrismaAnotacoesRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const getAnotacoesService = new GetAnotacoesService(prismaAnotacoesRepository);

    // Executando o service
    const anotacoes = await getAnotacoesService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(anotacoes instanceof Error) {
      return res.status(400).send(anotacoes.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        anotacoes,
      }
    );
  }
}

export { GetAnotacoesController };