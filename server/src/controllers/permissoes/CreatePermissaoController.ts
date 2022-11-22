import { Request, Response } from "express";
import { PrismaPermissoesRepository } from "../../repositories/prisma/permissoes/prisma-permissoes-repository";
import { CreatePermissaoService } from "../../services/permissoes/CreatePermissaoService";

class CreatePermissaoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { description } = req.body;

    // Repositório do modelo do Prisma
    const prismaPermissoesRepository = new PrismaPermissoesRepository();

    // Service da Permissão
    const createPermissaoService = new CreatePermissaoService(prismaPermissoesRepository);

    // Executando o service
    const permissao = createPermissaoService.execute({
      description,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(permissao instanceof Error) {
      return res.status(400).send(permissao.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Permissão criada com sucesso!",
      }
    );    
  }
}

export { CreatePermissaoController };