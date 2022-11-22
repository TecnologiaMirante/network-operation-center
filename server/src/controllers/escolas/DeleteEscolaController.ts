import { Request, Response } from "express";
import { PrismaEscolasRepository } from "../../repositories/prisma/escolas/prisma-escolas-repository";
import { DeleteEscolaService } from "../../services/escolas/DeleteEscolaService";

class DeleteEscolaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo Escola do Prisma
    const prismaEscolasRepository = new PrismaEscolasRepository();

    // Service da Escola
    const deleteEscolaService = new DeleteEscolaService(prismaEscolasRepository);

    // Executando o service
    const Escola = await deleteEscolaService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(Escola instanceof Error) {
      return res.status(400).send(Escola.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteEscolaController };