import { Request, Response} from "express";
import { PrismaUserTypeHasPermissoesRepository } from "../../repositories/prisma/permissoes/prisma-user-type-has-permissoes-repository";
import { GetTypeHasPermissoesService } from "../../services/types-has-permissoes/GetTypeHasPermissoesService";

class GetTypeHasPermissoesController {
  async handle(req:Request, res: Response) {

    // Repositório do modelo do Prisma
    const prismaUserTypeHasPermissoesRepository = new PrismaUserTypeHasPermissoesRepository();

    // Service 
    const getTypeHasPermissoesService = new GetTypeHasPermissoesService(prismaUserTypeHasPermissoesRepository);

    // Executando o service
    const typeHasPermissoes = await getTypeHasPermissoesService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(typeHasPermissoes instanceof Error) {
      return res.status(400).send(typeHasPermissoes.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        typeHasPermissoes
      }
    )

  }
}

export { GetTypeHasPermissoesController };