import { Request, Response } from "express";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { DeleteConteudoService } from "../../services/conteudos/DeleteConteudoService";

class DeleteConteudoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaConteudosRepository = new PrismaConteudosRepository();

    // Service da Secretaria
    const deleteConteudoService = new DeleteConteudoService(prismaConteudosRepository);

    // Executando o service
    const conteudo = await deleteConteudoService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(conteudo instanceof Error) {
      return res.status(400).send(conteudo.message);
    }

    // Retornando Permissao encontrada para o usuário
    return res.status(204).end()
  }
}

export { DeleteConteudoController };