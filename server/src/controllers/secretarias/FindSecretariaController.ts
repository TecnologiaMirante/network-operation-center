import { Request, Response} from "express";
import { PrismaSecretariasRepository } from "../../repositories/prisma/secretarias/prisma-secretarias-repository";
import { FindSecretariaService } from "../../services/secretarias/FindSecretariaService";

class FindSecretariaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaSecretariasRepository = new PrismaSecretariasRepository();
    
    // Service da Secretaria
    const findSecretariasService = new FindSecretariaService(prismaSecretariasRepository);

    // Executando o service
    const secretaria = await findSecretariasService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(secretaria instanceof Error) {
      return res.status(400).send(secretaria.message);
    }

    // Retornando Secretaria encontrada para o usuário
    return res.status(200).send(
      {
        secretaria
      }
    )
  }
}

export { FindSecretariaController };