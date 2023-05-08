import { Request, Response} from "express";
import { PrismaUserTypeHasPermissoesRepository } from "../../repositories/prisma/permissoes/prisma-user-type-has-permissoes-repository";
import { FindTypeHasPermissoesService } from "../../services/types-has-permissoes/FindTypeHasPermissoesService";

class FindTypeHasPermissoesController {
  async handle(req:Request, res: Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaUserTypeHasPermissoesRepository = new PrismaUserTypeHasPermissoesRepository();

    // Service 
    const findTypeHasPermissoesService = new FindTypeHasPermissoesService(prismaUserTypeHasPermissoesRepository);

    // Executando o service
    const typeHasPermissoes = await findTypeHasPermissoesService.execute({id});

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

export { FindTypeHasPermissoesController };