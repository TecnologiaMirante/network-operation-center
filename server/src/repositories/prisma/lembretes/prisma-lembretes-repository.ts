import { prisma } from "../../../prisma";
import { LembreteCreateData, LembretesRepository, LembreteFind, LembreteDelete, LembreteUpdate, LembreteGetByAluno } from "../../interfaces/lembretes/lembretes-repository";

export class PrismaLembretesRepository implements LembretesRepository {

  async create( { title, description, data, start, end, id_turma, id_disciplina, id_aluno, id_professor }: LembreteCreateData ) {
    return await prisma.lembrete.create({
      data: {
        title,
        description,
        data,
        start,
        end,
        id_turma, 
        id_disciplina,
        id_aluno, 
        id_professor
      }
    })
  };

  async get() {
    const lembretes = await prisma.lembrete.findMany();
    return lembretes;
  }

  async getByAluno({ id_aluno }: LembreteGetByAluno) {
    const lembretes = await prisma.lembrete.findMany({
      where: {
        id_aluno
      },     
      select: {
        id: true,
        title: true,
        description: true,
        data: true,
        start: true,
        end: true,
      },
      orderBy: {
        title: "asc"
      }
    })
    
    for (let lembrete of lembretes) {
      Object(lembrete).data = lembrete.data.toLocaleDateString();
      Object(lembrete).start = lembrete.start.toLocaleTimeString();
      Object(lembrete).end = lembrete.end.toLocaleTimeString();
    }

    return lembretes;
  }

  async find({ id }: LembreteFind) {
    const lembrete = await prisma.lembrete.findUnique(
      {
        where: {
          id
        },
        include: {
          aluno: true,
          professor: true,
          turma: true
        },
      }
    );
    return lembrete;
  }


  async delete({ id }: LembreteDelete) {
    await prisma.lembrete.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, title, description, data, start, end, id_turma, id_disciplina, id_aluno, id_professor }: LembreteUpdate) {
    await prisma.lembrete.update({
      where: {
        id
      },
      data: {
        title,
        description,
        data,
        start,
        end,
        id_turma, 
        id_disciplina,
        id_aluno, 
        id_professor
      }
    })
  };
}