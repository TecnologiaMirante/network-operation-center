import { Request, Response } from "express";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { GetConteudosService } from "../../services/conteudos/GetConteudosService";

class GetConteudosController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo secretaria do Prisma
    const prismaConteudosRepository = new PrismaConteudosRepository();

    // Service da Secretaria
    const getConteudosService = new GetConteudosService(prismaConteudosRepository);

    // Executando o service
    const conteudo = await getConteudosService.execute()

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(conteudo instanceof Error) {
      return res.status(400).send(conteudo.message);
    }

    // Retornando Permissao encontrada para o usuário
    return res.status(200).send(
      {
        conteudo
      }
    )
  }
}

export { GetConteudosController };