import { Request, Response } from "express";
import { PrismaLembretesRepository } from "../../repositories/prisma/lembretes/prisma-lembretes-repository";
import { GetLembretesService } from "../../services/lembretes/GetLembretesService";

class GetLembretesController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo do prisma
    const prismaLembretesRepository = new PrismaLembretesRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const getLembretesService = new GetLembretesService(prismaLembretesRepository);


    // Executando o service
    const lembretes = await getLembretesService.execute()

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(lembretes instanceof Error) {
      return res.status(400).send(lembretes.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        lembretes,
      }
    );
  }
}

export { GetLembretesController };