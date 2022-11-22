import { Request, Response } from "express";
import { PrismaResponsaveisRepository } from "../../repositories/prisma/responsaveis/prisma-responsaveis-repository";
import { FindResponsavelService } from "../../services/responsaveis/FindResponsavelService";

class FindResponsavelController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaResponsaveisRepository = new PrismaResponsaveisRepository();

    // Service
    const findResponsavelService = new FindResponsavelService(prismaResponsaveisRepository);

    // Executando o service
    const resp = await findResponsavelService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(resp instanceof Error) {
      return res.status(400).send(resp.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        resp,
      }
    );
  }
}

export { FindResponsavelController };