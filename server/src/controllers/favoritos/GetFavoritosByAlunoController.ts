import { Request, Response } from "express";
import { PrismaFavoritosRepository } from "../../repositories/prisma/favoritos/prisma-favoritos-repository";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { GetFavoritosByAlunoService } from "../../services/favoritos/GetFavoritosByAlunoService";

class GetFavoritosByAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_aluno } = req.params;

    // Repositório do modelo do prisma
    const prismaAlunoRespondeAtividadesRepository = new PrismaFavoritosRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getFavoritosByAlunoService = new GetFavoritosByAlunoService(prismaAlunoRespondeAtividadesRepository, prismaAlunosRepository);

    // Executando o service
    const favoritos = await getFavoritosByAlunoService.execute({
      id_aluno
    })

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

export { GetFavoritosByAlunoController };