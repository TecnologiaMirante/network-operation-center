import { Request, Response } from "express";
import { PrismaSecretariasRepository } from "../../repositories/prisma/secretarias/prisma-secretarias-repository";
import { DeleteSecretariaService } from "../../services/secretarias/DeleteSecretariaService";

class DeleteSecretariaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaSecretariasRepository = new PrismaSecretariasRepository();

    // Service da secretaria
    const deleteSecretariaService = new DeleteSecretariaService(prismaSecretariasRepository);

    // Executando o service
    const secretaria = await deleteSecretariaService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(secretaria instanceof Error) {
      return res.status(400).send(secretaria.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteSecretariaController };