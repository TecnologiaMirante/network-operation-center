import { Request, Response } from "express";
import { PrismaResponsaveisRepository } from "../../repositories/prisma/responsaveis/prisma-responsaveis-repository";
import { GetResponsaveisService } from "../../services/responsaveis/GetResponsaveisService";

class GetResponsaveisController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaResponsaveisRepository = new PrismaResponsaveisRepository();

    // Service
    const getResponsaveisService = new GetResponsaveisService(prismaResponsaveisRepository);

    // Executando o service
    const resps = await getResponsaveisService.execute()

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(resps instanceof Error) {
      return res.status(400).send(resps.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        resps,
      }
    );
  }
}

export { GetResponsaveisController };