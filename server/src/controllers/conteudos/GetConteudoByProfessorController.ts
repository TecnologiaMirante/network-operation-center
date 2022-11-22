import { Request, Response } from "express";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { GetConteudoByProfessorService } from "../../services/conteudos/GetConteudoByProfessorService";

class GetConteudoByProfessorController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaConteudosRepository = new PrismaConteudosRepository();
    const prismaProfessoresRepository = new PrismaProfessoresRepository();

    // Service da Secretaria
    const getConteudoByProfessorService = new GetConteudoByProfessorService(prismaConteudosRepository, prismaProfessoresRepository);

    // Executando o service
    const conteudos = await getConteudoByProfessorService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(conteudos instanceof Error) {
      return res.status(400).send(conteudos.message);
    }

    // Retornando Permissao encontrada para o usuário
    return res.status(200).send(
      {
        conteudos
      }
    )
  }
}

export { GetConteudoByProfessorController };