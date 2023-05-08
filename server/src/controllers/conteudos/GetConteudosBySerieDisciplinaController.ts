import { Request, Response } from "express";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { PrismaSeriesRepository } from "../../repositories/prisma/series/prisma-series-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { GetConteudosBySerieDisciplinaService } from "../../services/conteudos/GetConteudosBySerieDisciplinaService";

class GetConteudosBySerieDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id_professor, id_serie, id_disciplina } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaConteudosRepository = new PrismaConteudosRepository();
    const prismaSeriesRepository = new PrismaSeriesRepository();
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

    // Service da Secretaria
    const getConteudosBySerieDisciplinaService = new GetConteudosBySerieDisciplinaService(prismaConteudosRepository, prismaSeriesRepository, prismaDisciplinasRepository);

    // Executando o service
    const conteudos = await getConteudosBySerieDisciplinaService.execute({
      id_professor,
      id_serie, 
      id_disciplina
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(conteudos instanceof Error) {
      return res.status(400).send(conteudos.message);
    }

    // Retornando o conteúdo encontrado para o usuário
    return res.status(200).send(
      {
        conteudos
      }
    )
  }
}

export { GetConteudosBySerieDisciplinaController };