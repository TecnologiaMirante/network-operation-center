import e, { Request, Response } from "express";
import { PrismaFavoritosRepository } from "../../repositories/prisma/favoritos/prisma-favoritos-repository";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaAulasRepository } from "../../repositories/prisma/aulas/prisma-aulas-repository";
import { CreateFavoritoService } from "../../services/favoritos/CreateFavoritoService";
import { DeleteFavoritoService } from "../../services/favoritos/DeleteFavoritoService";
import { FindFavoritoByDataService } from "../../services/favoritos/FindFavoritoByDataService";

class CreateFavoritoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_aluno } = req.params;
    const { id_aula } = req.body;

    // Repositório do modelo do prisma
    const prismaFavoritosRepository = new PrismaFavoritosRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaAulasRepository = new PrismaAulasRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const findFavoritoByDataService = new FindFavoritoByDataService(prismaFavoritosRepository, prismaAlunosRepository, prismaAulasRepository);

    // Buscando se o registro já existe
    const registro = await findFavoritoByDataService.execute({
      id_aluno,
      id_aula
    })

    // Se o registro não existir, ele cria o registro
    if (registro instanceof Error) {
      const createFavoritoService = new CreateFavoritoService(prismaFavoritosRepository, prismaAlunosRepository, prismaAulasRepository);

      // Executando o service
      const Favorito = await createFavoritoService.execute({
        id_aluno, 
        id_aula,
      });

      // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
      if(Favorito instanceof Error) {
        return res.status(400).send(Favorito.message);
      }

      // Retornando mensagem de sucesso para o usuário
      return res.status(201).send(
        {
          message:"Favoritado com sucesso!",
        }
      );
    } 

    // Se o registro já existir, ele apaga
    else {
      const deleteFavoritoService = new DeleteFavoritoService(prismaFavoritosRepository);

      // Executando o service
      const Favorito = await deleteFavoritoService.execute({
        id: Object(registro).id
      })

      // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
      if(Favorito instanceof Error) {
        return res.status(400).send(Favorito.message);
      }

      // Retornando mensagem de sucesso para o usuário
      return res.status(204).end();
    }


  }
}

export { CreateFavoritoController };