import { Request, Response} from "express";
import { PrismaUserTypeHasPermissoesRepository } from "../../repositories/prisma/permissoes/prisma-user-type-has-permissoes-repository";
import { DeleteTypeHasPermissoesService } from "../../services/types-has-permissoes/DeleteTypeHasPermissoesService";

class DeleteTypeHasPermissoesController {
  async handle(req:Request, res: Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaUserTypeHasPermissoesRepository = new PrismaUserTypeHasPermissoesRepository();

    // Service 
    const deleteTypeHasPermissoesService = new DeleteTypeHasPermissoesService(prismaUserTypeHasPermissoesRepository);

    // Executando o service
    const typeHasPermissoes = await deleteTypeHasPermissoesService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(typeHasPermissoes instanceof Error) {
      return res.status(400).send(typeHasPermissoes.message);
    }

    // Retornando status
    return res.status(204).send()

  }
}

export { DeleteTypeHasPermissoesController };