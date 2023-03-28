import { Request, Response} from "express";
import { PrismaPermissoesRepository } from "../../repositories/prisma/permissoes/prisma-permissoes-repository";
import { FindPermissaoService } from "../../services/permissoes/FindPermissaoService";

class FindPermissaoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaPermissoesRepository = new PrismaPermissoesRepository();
    
    // Service da Permissao
    const findPermissaoService = new FindPermissaoService(prismaPermissoesRepository);

    // Executando o service
    const permissao = await findPermissaoService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(permissao instanceof Error) {
      return res.status(400).send(permissao.message);
    }

    // Retornando Permissao encontrada para o usuário
    return res.status(200).send(
      {
        permissao
      }
    )
  }
}

export { FindPermissaoController };