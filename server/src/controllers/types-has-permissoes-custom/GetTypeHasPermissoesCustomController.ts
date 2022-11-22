import { Request, Response} from "express";
import { PrismaUserTypeHasPermissoesCustomRepository } from "../../repositories/prisma/permissoes/prisma-user-type-has-permissoes-custom-repository";
import { GetTypeHasPermissoesCustomService } from "../../services/types-has-permissoes-custom/GetTypeHasPermissoesCustomService";

class GetTypeHasPermissoesCustomController {
  async handle(req:Request, res: Response) {

    // Repositório do modelo do Prisma
    const prismaUserTypeHasPermissoesCustomRepository = new PrismaUserTypeHasPermissoesCustomRepository();

    // Service 
    const getTypeHasPermissoesCustomService = new GetTypeHasPermissoesCustomService(prismaUserTypeHasPermissoesCustomRepository);

    // Executando o service
    const typeHasPermissoesCustom = await getTypeHasPermissoesCustomService.execute();

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

export { GetTypeHasPermissoesCustomController };