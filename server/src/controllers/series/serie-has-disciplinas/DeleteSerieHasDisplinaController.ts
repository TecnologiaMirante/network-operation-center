import { Request, Response } from "express";
import { PrismaSerieHasDisciplinasRepository } from "../../../repositories/prisma/series/prisma-serie-has-disciplinas-repository";
import { DeleteSerieHasDisplinaService } from "../../../services/series/serie-has-disciplinas/DeleteSerieHasDisciplinaService";

class DeleteSerieHasDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaSerieHasDisciplinasRepository = new PrismaSerieHasDisciplinasRepository();

    // Service
    const deleteSerieService = new DeleteSerieHasDisplinaService(prismaSerieHasDisciplinasRepository);

    // Executando o service
    const serie = await deleteSerieService.execute({
      id,  
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(serie instanceof Error) {
      return res.status(400).send(serie.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteSerieHasDisciplinaController };