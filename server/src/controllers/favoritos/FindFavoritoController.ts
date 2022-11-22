import { Request, Response } from "express";
import { PrismaFavoritosRepository } from "../../repositories/prisma/favoritos/prisma-favoritos-repository";
import { FindFavoritoService } from "../../services/favoritos/FindFavoritoAulaService";

class FindAlunoFavoritaAulaController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaAlunoRespondeAtividadesRepository = new PrismaFavoritosRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const findFavoritoService = new FindFavoritoService(prismaAlunoRespondeAtividadesRepository);

    // Executando o service
    const alunoFavoritaAula = await findFavoritoService.execute({
      id
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(alunoFavoritaAula instanceof Error) {
      return res.status(400).send(alunoFavoritaAula.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        alunoFavoritaAula
      }
    );
  }
}

export { FindAlunoFavoritaAulaController };