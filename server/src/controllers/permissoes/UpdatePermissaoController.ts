import { Request, Response } from "express";
import { PrismaPermissoesRepository } from "../../repositories/prisma/permissoes/prisma-permissoes-repository";
import { UpdatePermissaoService } from "../../services/permissoes/UpdatePermissaoService";

class UpdatePermissaoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { description } = req.body;

    // Repositório do modelo do Prisma
    const prismaPermissoesRepository = new PrismaPermissoesRepository();

    // Service da Permissão
    const updatePermissaoService = new UpdatePermissaoService(prismaPermissoesRepository);

    // Executando o service
    const permissao = updatePermissaoService.execute({
      id,
      description,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(permissao instanceof Error) {
      return res.status(400).send(permissao.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(204).send();
  }
}

export { UpdatePermissaoController };