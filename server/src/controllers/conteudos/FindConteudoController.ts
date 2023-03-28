import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { FindConteudoService } from "../../services/conteudos/FindConteudoService";

class FindConteudoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaConteudosRepository = new PrismaConteudosRepository();

    // Service da Secretaria
    const findConteudoService = new FindConteudoService(prismaConteudosRepository);

    // Executando o service
    const conteudo = await findConteudoService.execute({
      id,
    })

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

export { FindConteudoController };