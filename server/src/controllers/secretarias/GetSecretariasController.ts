import { Request, Response} from "express";
import { PrismaSecretariasRepository } from "../../repositories/prisma/secretarias/prisma-secretarias-repository";
import { GetSecretariasService } from "../../services/secretarias/GetSecretariasService";

class GetSecretariasController {
  async handle(req:Request, res:Response) {
    
    // Repositório do modelo secretaria do Prisma
    const prismaSecretariasRepository = new PrismaSecretariasRepository();
    
    // Service da Secretaria
    const getSecretariasService = new GetSecretariasService(prismaSecretariasRepository);

    // Executando o service
    const secretarias = await getSecretariasService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(secretarias instanceof Error) {
      return res.status(400).send(secretarias.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        secretarias
      }
    )

  };
}

export { GetSecretariasController };