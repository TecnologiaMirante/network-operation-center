import { Request, Response } from "express";
import { PrismaFavoritosRepository } from "../../repositories/prisma/favoritos/prisma-favoritos-repository";
import { DeleteFavoritoService } from "../../services/favoritos/DeleteFavoritoService";

class DeleteFavoritoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaFavoritosRepository = new PrismaFavoritosRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const deleteFavoritoService = new DeleteFavoritoService(prismaFavoritosRepository);

    // Executando o service
    const alunoFavoritaAula = await deleteFavoritoService.execute({
      id
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(alunoFavoritaAula instanceof Error) {
      return res.status(400).send(alunoFavoritaAula.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(204).end();
  }
}

export { DeleteFavoritoController };