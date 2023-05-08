import { Request, Response} from "express";
import { PrismaPermissoesRepository } from "../../repositories/prisma/permissoes/prisma-permissoes-repository";
import { DeletePermissaoService } from "../../services/permissoes/DeletePermissaoService";

class DeletePermissaoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaPermissoesRepository = new PrismaPermissoesRepository();
    
    // Service da Permissao
    const deletePermissaoService = new DeletePermissaoService(prismaPermissoesRepository);

    // Executando o service
    const permissao = await deletePermissaoService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(permissao instanceof Error) {
      return res.status(400).send(permissao.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeletePermissaoController };