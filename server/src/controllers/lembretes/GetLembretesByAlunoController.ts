import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaLembretesRepository } from "../../repositories/prisma/lembretes/prisma-lembretes-repository";
import { GetLembretesByAlunoService } from "../../services/lembretes/GetLembretesByAlunoService";

class GetLembretesByAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetros da requisição
    const { id_aluno } = req.params;

    // Repositório do modelo do prisma
    const prismaLembretesRepository = new PrismaLembretesRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const getLembretesByAlunoService = new GetLembretesByAlunoService(prismaLembretesRepository, prismaAlunosRepository);


    // Executando o service
    const lembretes = await getLembretesByAlunoService.execute({
      id_aluno
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(lembretes instanceof Error) {
      return res.status(400).send(lembretes.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        lembretes,
      }
    );
  }
}

export { GetLembretesByAlunoController };