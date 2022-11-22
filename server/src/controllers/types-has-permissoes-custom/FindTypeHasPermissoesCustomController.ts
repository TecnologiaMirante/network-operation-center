import { Request, Response} from "express";
import { PrismaUserTypeHasPermissoesCustomRepository } from "../../repositories/prisma/permissoes/prisma-user-type-has-permissoes-custom-repository";
import { FindTypeHasPermissoesCustomService } from "../../services/types-has-permissoes-custom/FindTypeHasPermissoesCustomService";

class FindTypeHasPermissoesCustomController {
  async handle(req:Request, res: Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaUserTypeHasPermissoesCustomRepository = new PrismaUserTypeHasPermissoesCustomRepository();

    // Service 
    const findTypeHasPermissoesCustomService = new FindTypeHasPermissoesCustomService(prismaUserTypeHasPermissoesCustomRepository);

    // Executando o service
    const typeHasPermissoesCustom = await findTypeHasPermissoesCustomService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(typeHasPermissoesCustom instanceof Error) {
      return res.status(400).send(typeHasPermissoesCustom.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        typeHasPermissoesCustom
      }
    )

  }
}

export { FindTypeHasPermissoesCustomController };