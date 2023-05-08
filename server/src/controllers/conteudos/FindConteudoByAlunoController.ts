import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { FindConteudoByAlunoService } from "../../services/conteudos/FindConteudoByAlunoService";

class FindConteudoByAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id, id_aluno } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaConteudosRepository = new PrismaConteudosRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();

    // Service da Secretaria
    const findConteudoByAlunoService = new FindConteudoByAlunoService(prismaConteudosRepository, prismaAlunosRepository);

    // Executando o service
    const conteudo = await findConteudoByAlunoService.execute({
      id,
      id_aluno
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

export { FindConteudoByAlunoController };