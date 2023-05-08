import { Request, Response } from "express";
import { PrismaPermissoesRepository } from "../../repositories/prisma/permissoes/prisma-permissoes-repository";
import { GetPermissoesService } from "../../services/permissoes/GetPermissoesService";

class GetPermissoesController {
  async handle(req:Request, res:Response) {
    
    // Repositório do modelo secretaria do Prisma
    const prismaPermissoesRepository = new PrismaPermissoesRepository();
    
    // Service da Secretaria
    const getPermissoesService = new GetPermissoesService(prismaPermissoesRepository);

    // Executando o service
    const permissoes = await getPermissoesService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(permissoes instanceof Error) {
      return res.status(400).send(permissoes.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        permissoes
      }
    )

  };
}

export { GetPermissoesController };