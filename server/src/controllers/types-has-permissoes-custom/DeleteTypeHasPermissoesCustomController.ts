import { Request, Response} from "express";
import { PrismaUserTypeHasPermissoesCustomRepository } from "../../repositories/prisma/permissoes/prisma-user-type-has-permissoes-custom-repository";
import { DeleteTypeHasPermissoesCustomService } from "../../services/types-has-permissoes-custom/DeleteTypeHasPermissoesCustomService";

class DeleteTypeHasPermissoesCustomController {
  async handle(req:Request, res: Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaUserTypeHasPermissoesCustomRepository = new PrismaUserTypeHasPermissoesCustomRepository();

    // Service 
    const deleteTypeHasPermissoesCustomService = new DeleteTypeHasPermissoesCustomService(prismaUserTypeHasPermissoesCustomRepository);

    // Executando o service
    const typeHasPermissoesCustom = await deleteTypeHasPermissoesCustomService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(typeHasPermissoesCustom instanceof Error) {
      return res.status(400).send(typeHasPermissoesCustom.message);
    }

    // Retornando status
    return res.status(204).send()

  }
}

export { DeleteTypeHasPermissoesCustomController };