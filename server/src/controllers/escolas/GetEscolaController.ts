import { Request, Response} from "express";
import { PrismaEscolasRepository } from "../../repositories/prisma/escolas/prisma-escolas-repository";
import { GetEscolasService } from "../../services/escolas/GetEscolasService";

class GetEscolasController {
  async handle(req:Request, res:Response) {
    
    // Repositório do modelo Escola do Prisma
    const prismaEscolasRepository = new PrismaEscolasRepository();
    
    // Service da Escola
    const getEscolasService = new GetEscolasService(prismaEscolasRepository);

    // Executando o service
    const escolas = await getEscolasService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolas instanceof Error) {
      return res.status(400).send(escolas.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        escolas
      }
    )

  };
}

export { GetEscolasController };