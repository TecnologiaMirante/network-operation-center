import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaLembretesRepository } from "../../repositories/prisma/lembretes/prisma-lembretes-repository";
import { DeleteLembreteService } from "../../services/lembretes/DeleteLembreteService";

class DeleteLembreteController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetros da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaLembretesRepository = new PrismaLembretesRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const deleteLembreteService = new DeleteLembreteService(prismaLembretesRepository);

    // Executando o service
    const lembretes = await deleteLembreteService.execute({
      id
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(lembretes instanceof Error) {
      return res.status(400).send(lembretes.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(204).end();
  }
}

export { DeleteLembreteController };