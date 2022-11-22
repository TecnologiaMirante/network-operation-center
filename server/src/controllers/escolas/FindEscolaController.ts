import { Request, Response} from "express";
import { PrismaEscolasRepository } from "../../repositories/prisma/escolas/prisma-escolas-repository";
import { FindEscolaService } from "../../services/escolas/FindEscolaService";

class FindEscolaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo Escola do Prisma
    const prismaEscolasRepository = new PrismaEscolasRepository();
    
    // Service da Escola
    const findEscolasService = new FindEscolaService(prismaEscolasRepository);

    // Executando o service
    const escola = await findEscolasService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escola instanceof Error) {
      return res.status(400).send(escola.message);
    }

    // Retornando Escola encontrada para o usuário
    return res.status(200).send(
      {
        escola
      }
    )
  }
}

export { FindEscolaController };