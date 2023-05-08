import { Request, Response } from "express";
import { PrismaSecretariasRepository } from "../../repositories/prisma/secretarias/prisma-secretarias-repository";
import { UpdateSecretariaService } from "../../services/secretarias/UpdateSecretariaService";

class UpdateSecretariaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { name } = req.body;

    // Repositório do modelo secretaria do Prisma
    const prismaSecretariasRepository = new PrismaSecretariasRepository();

    // Service da Secretaria
    const updateSecretariaService = new UpdateSecretariaService(prismaSecretariasRepository);

    // Executando o service
    const secretaria = await updateSecretariaService.execute({
      id,
      name,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(secretaria instanceof Error) {
      return res.status(400).send(secretaria.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(204).send();
  }
}

export { UpdateSecretariaController };