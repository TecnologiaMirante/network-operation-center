import { Request, Response } from "express";
import { PrismaResponsaveisRepository } from "../../repositories/prisma/responsaveis/prisma-responsaveis-repository";
import { DeleteResponsavelService } from "../../services/responsaveis/DeleteResponsavelService";

class DeleteResponsavelController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaResponsaveisRepository = new PrismaResponsaveisRepository();

    // Service
    const deleteResponsavelService = new DeleteResponsavelService(prismaResponsaveisRepository);

    // Executando o service
    const resp = await deleteResponsavelService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(resp instanceof Error) {
      return res.status(400).send(resp.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteResponsavelController };