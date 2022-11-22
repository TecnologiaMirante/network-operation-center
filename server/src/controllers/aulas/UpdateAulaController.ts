import { Request, Response } from "express";
import { PrismaAulasRepository } from "../../repositories/prisma/aulas/prisma-aulas-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { PrismaSeriesRepository } from "../../repositories/prisma/series/prisma-series-repository";
import { UpdateAulaService } from "../../services/aulas/UpdateAulaService";

class UpdateAulaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { hash, title, file, thumb, time, id_serie, id_disciplina, id_conteudo } = req.body;

    // Repositório do modelo do Prisma
    const prismaAulasRepository = new PrismaAulasRepository();
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
    const prismaSeriesRepository = new PrismaSeriesRepository();

    // Service
    const updateAulaService = new UpdateAulaService(prismaAulasRepository, prismaDisciplinasRepository, prismaSeriesRepository);

    // Executando o service
    const aula = await updateAulaService.execute({
      id,
      hash, 
      title, 
      file, 
      thumb, 
      time, 
      id_serie, 
      id_disciplina,
      id_conteudo
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(aula instanceof Error) {
      return res.status(400).send(aula.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateAulaController };