import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaMediasRepository } from "../../repositories/prisma/medias/prisma-medias-repository";
import { GetMediasByAlunoService } from "../../services/medias/GetMediasByAlunoService";

class GetMediasByAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id_aluno } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaMediasRepository = new PrismaMediasRepository();

    // Service da Secretaria
    const getMediasByAluno = new GetMediasByAlunoService(prismaMediasRepository, prismaAlunosRepository);

    // Executando o service
    const medias = await getMediasByAluno.execute({
      id_aluno,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(medias instanceof Error) {
      return res.status(400).send(medias.message);
    }

    // Retornando Permissao encontrada para o usuário
    return res.status(200).send(
      {
        medias
      }
    )
  }
}

export { GetMediasByAlunoController };