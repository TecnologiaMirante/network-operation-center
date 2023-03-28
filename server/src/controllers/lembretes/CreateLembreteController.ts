import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaLembretesRepository } from "../../repositories/prisma/lembretes/prisma-lembretes-repository";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { PrismaTurmasRepository } from "../../repositories/prisma/turmas/prisma-turmas-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { CreateLembreteService } from "../../services/lembretes/CreateLembreteService";

class CreateLembreteController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { title, description, data, start, end, id_turma, id_disciplina, id_aluno, id_professor } = req.body;

    console.log("Antes da formatação da data: ")
    console.log("title: ", title)
    console.log("description: ", description)
    console.log("data: ", data)
    console.log("start: ", start)
    console.log("end: ", end)
    console.log("id_turma: ", id_turma)
    console.log("id_disciplina: ", id_disciplina)
    console.log("id_aluno: ", id_aluno)
    console.log("id_professor: ", id_professor)

    const data_formatada = new Date(data)
    const start_formatada = new Date(start)
    const end_formatada = new Date(end)

    console.log("\n\nDepois: ")
    console.log(data_formatada)
    console.log(start_formatada)
    console.log(end_formatada)

    // Repositório do modelo do prisma
    const prismaLembretesRepository = new PrismaLembretesRepository();
    const prismaTurmasRepository = new PrismaTurmasRepository();
    const prismaProfessoresRepository = new PrismaProfessoresRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const createLembreteService = new CreateLembreteService(prismaLembretesRepository, prismaTurmasRepository, prismaDisciplinasRepository, prismaProfessoresRepository, prismaAlunosRepository);

    // Executando o service
    const lembrete = await createLembreteService.execute({
      title,
      description,
      data: data_formatada,
      data_masked: data_formatada.toISOString().split('T')[0],
      start: start_formatada,
      end: end_formatada,
      id_turma, 
      id_disciplina,
      id_aluno, 
      id_professor
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(lembrete instanceof Error) {
      return res.status(400).send(lembrete.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Lembrete criado com sucesso!",
      }
    );
  }
}

export { CreateLembreteController };