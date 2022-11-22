import { Request, Response } from "express";
import { PrismaAlunoRespondeAtividadesRepository } from "../../../repositories/prisma/alunos/prisma-aluno-responde-atividade";
import { PrismaAlunosRepository } from "../../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaDisciplinasRepository } from "../../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { GetNotasByDisciplinaAlunoService } from "../../../services/alunos/aluno-responde-atividades/GetNotasByDisciplinaAlunoService";

class GetNotasByDisciplinaAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_aluno  } = req.params;

    // Repositório do modelo do prisma
    const prismaAlunoRespondeAtividadesRepository = new PrismaAlunoRespondeAtividadesRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getNotasByDisciplinaAlunoService = new GetNotasByDisciplinaAlunoService(prismaAlunosRepository, prismaAlunoRespondeAtividadesRepository);

    // Executando o service
    const notas = await getNotasByDisciplinaAlunoService.execute({
      id_aluno, 
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(notas instanceof Error) {
      return res.status(400).send(notas.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      notas
    );
  }
}

export { GetNotasByDisciplinaAlunoController };