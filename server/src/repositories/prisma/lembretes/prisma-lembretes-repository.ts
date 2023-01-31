import { prisma } from "../../../prisma";
import { LembreteCreateData, LembretesRepository, LembreteFind, LembreteDelete, LembreteUpdate, LembreteGetByAluno } from "../../interfaces/lembretes/lembretes-repository";

export class PrismaLembretesRepository implements LembretesRepository {

  async create( { title, description, data, data_masked, start, end, id_turma, id_disciplina, id_aluno, id_professor }: LembreteCreateData ) {
    return await prisma.lembrete.create({
      data: {
        title,
        description,
        data,
        data_masked,
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
    const lembretes = await prisma.lembrete.findMany({
      include: {
        turma: {
          select: {
             name: true
          }
        }
      }
    });
   

    for (let lembrete of lembretes) {
      Object(lembrete).data = lembrete.data.toLocaleDateString('pt-br');
      Object(lembrete).start = lembrete.start.toLocaleTimeString('pt-br');
      Object(lembrete).end = lembrete.end.toLocaleTimeString('pt-br');
    }

    return lembretes;
  }

  async getByAluno({ id_aluno }: LembreteGetByAluno) {

    const turma = await prisma.aluno.findFirst({
      where: {
        id: id_aluno
      },
      select: {
        id_turma: true
      }
    });

    const lembretesTurma = await prisma.lembrete.findMany({
      where: {
        id_turma: Object(turma).id_turma
      },     
      select: {
        id: true,
        title: true,
        description: true,
        data: true,
        data_masked: true,
        start: true,
        end: true,
      },
      orderBy: {
        title: "asc"
      }
    })

    const lembretesAlunos = await prisma.lembrete.findMany({
      where: {
        id_aluno,
      },     
      select: {
        id: true,
        title: true,
        description: true,
        data: true,
        data_masked: true,
        start: true,
        end: true,
      },
      orderBy: {
        title: "asc"
      }
    })

    const lembretes = [...lembretesTurma, ...lembretesAlunos]
    
    for (let lembrete of lembretes) {
      Object(lembrete).data = lembrete.data.toLocaleString('pt-br');
      Object(lembrete).start = lembrete.start.toLocaleString('pt-br');
      Object(lembrete).end = lembrete.end.toLocaleString('pt-br');
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

    Object(lembrete).data = Object(lembrete).data.toLocaleDateString('pt-br');
    Object(lembrete).start = Object(lembrete).start.toLocaleTimeString('pt-br');
    Object(lembrete).end = Object(lembrete).end.toLocaleTimeString('pt-br');

    return lembrete;
  }


  async delete({ id }: LembreteDelete) {
    await prisma.lembrete.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, title, description, data, data_masked, start, end, id_turma, id_disciplina, id_aluno, id_professor }: LembreteUpdate) {
    await prisma.lembrete.update({
      where: {
        id
      },
      data: {
        title,
        description,
        data,
        data_masked,
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