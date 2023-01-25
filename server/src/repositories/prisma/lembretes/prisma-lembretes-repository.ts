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
    const lembretes = await prisma.lembrete.findMany();
   

    for (let lembrete of lembretes) {
      Object(lembrete).data = lembrete.data.toLocaleDateString();
      Object(lembrete).start = lembrete.start.toLocaleTimeString();
      Object(lembrete).end = lembrete.end.toLocaleTimeString();
    }

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
        data_masked: true,
        start: true,
        end: true,
      },
      orderBy: {
        title: "asc"
      }
    })
    
    for (let lembrete of lembretes) {
      Object(lembrete).data = lembrete.data.toLocaleString();
      Object(lembrete).start = lembrete.start.toLocaleString();
      Object(lembrete).end = lembrete.end.toLocaleString();

    }
    console.log("tentando achar error 2",lembretes)

    return lembretes;
  }

  async find({ id }: LembreteFind) {

    console.log(id)
    console.log("\n")

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

    console.log("\n")
    console.log("o erro ta aqui")
    console.log(lembrete)
    console.log("\n")
    console.log("\n")

    Object(lembrete).data = Object(lembrete).data.toLocaleDateString();
    Object(lembrete).start = Object(lembrete).start.toLocaleTimeString();
    Object(lembrete).end = Object(lembrete).end.toLocaleTimeString();

    console.log("depois do erro")

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