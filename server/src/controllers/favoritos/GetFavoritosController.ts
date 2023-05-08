import { Request, Response } from "express";
import { PrismaFavoritosRepository } from "../../repositories/prisma/favoritos/prisma-favoritos-repository";
import { GetFavoritosService } from "../../services/favoritos/GetFavoritosService";

class GetFavoritosController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo do prisma
    const prismaAlunoRespondeAtividadesRepository = new PrismaFavoritosRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getFavoritosService = new GetFavoritosService(prismaAlunoRespondeAtividadesRepository);

    // Executando o service
    const favoritos = await getFavoritosService.execute()

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(favoritos instanceof Error) {
      return res.status(400).send(favoritos.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        favoritos
      }
    );
  }
}

export { GetFavoritosController };