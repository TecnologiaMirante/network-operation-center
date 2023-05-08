import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { GetConteudoByAlunoDisciplinaService } from "../../services/conteudos/GetConteudoByAlunoDisciplinaService";

class GetConteudoByAlunoDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id_aluno, id_disciplina } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaConteudosRepository = new PrismaConteudosRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

    // Service da Secretaria
    const getConteudoByAlunoDisciplina = new GetConteudoByAlunoDisciplinaService(prismaConteudosRepository, prismaAlunosRepository, prismaDisciplinasRepository);

    // Executando o service
    const conteudo = await getConteudoByAlunoDisciplina.execute({
      id_aluno,
      id_disciplina
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

export { GetConteudoByAlunoDisciplinaController };