import { Request, Response } from "express";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { DeleteEscolaUserService } from "../../../services/escolas//escola-users/DeleteEscolaUserService";

class DeleteEscolaUserController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo Escola do Prisma
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();

    // Service da Escola
    const deleteEscolaUserService = new DeleteEscolaUserService(prismaEscolaUsersRepository);

    // Executando o service
    const Escola = await deleteEscolaUserService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(Escola instanceof Error) {
      return res.status(400).send(Escola.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteEscolaUserController };