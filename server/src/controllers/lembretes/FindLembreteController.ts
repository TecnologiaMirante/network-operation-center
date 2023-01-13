import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaLembretesRepository } from "../../repositories/prisma/lembretes/prisma-lembretes-repository";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { PrismaTurmasRepository } from "../../repositories/prisma/turmas/prisma-turmas-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { CreateLembreteService } from "../../services/lembretes/CreateLembreteService";
import { FindLembreteService } from "../../services/lembretes/FindLembreteService";

class FindLembreteController {
  async handle(req:Request, res:Response) {

    const { id } = req.params;

    // Dados do corpo da requisição
    const { title, description, data, start, end, id_turma, id_disciplina, id_aluno, id_professor } = req.body;

    const data_formatada = new Date(data)
    const start_formatada = new Date(start)
    const end_formatada = new Date(end)

    // Repositório do modelo do prisma
    const prismaLembretesRepository = new PrismaLembretesRepository();
    const prismaTurmasRepository = new PrismaTurmasRepository();
    const prismaProfessoresRepository = new PrismaProfessoresRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const findLembreteService = new FindLembreteService(prismaLembretesRepository, prismaTurmasRepository, prismaDisciplinasRepository, prismaProfessoresRepository, prismaAlunosRepository);

    // Executando o service
    const lembrete = await findLembreteService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(lembrete instanceof Error) {
      return res.status(400).send(lembrete.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        lembrete,
      }
    );
  }
}

export { FindLembreteController };