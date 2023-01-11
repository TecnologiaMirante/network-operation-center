import { prisma } from "../../../prisma";
import { AlunoHasConquistasCreateData, AlunoHasConquistasRepository, AlunoHasConquistasFind, AlunoHasConquistasDelete, AlunoHasConquistasUpdate, AlunoHasConquistasRelateAllAlunos, AlunoHasConquistasGetByAluno } from "../../interfaces/conquistas/aluno-has-conquistas-repository";

type alunoHasConquista = {
  id_aluno: string;
  id_conquista: string;
}

export class PrismaAlunoHasConquistasRepository implements AlunoHasConquistasRepository {

  async create( { id_aluno, id_conquista, progress }: AlunoHasConquistasCreateData ) {
    
    return await prisma.aluno_has_conquista.create({
      data: {
        progress,
        id_aluno,
        id_conquista,
      }
    })
  };

  async get() {
    const questoes = await prisma.aluno_has_conquista.findMany();
    return questoes;
  }

  async getConquistasByAluno({ id_aluno }: AlunoHasConquistasGetByAluno) {
    const questoes = await prisma.aluno_has_conquista.findMany({
      where: {
        id_aluno,
        unlocked: true
      },
      select: {
        progress: true,
        conquista: true
      }
    });

    for (let questao of questoes) {
      Object(questao).conquista.progress = questao.progress
      delete Object(questao).progress;
    }

    return questoes;
  }

  async find({ id }: AlunoHasConquistasFind) {
    const questao = await prisma.aluno_has_conquista.findUnique(
      {
        where: {
          id
        },
      }
    );
    return questao;
  }

  async relateAll({ id_conquista }: AlunoHasConquistasRelateAllAlunos) {

    const alunos = await prisma.aluno.findMany();
    
    const data: alunoHasConquista[] = [];

    for (let aluno of alunos) {
      data.push({
        id_aluno: aluno.id,
        id_conquista: id_conquista,
      })
    }

    await prisma.aluno_has_conquista.createMany({
      data
    })

  }

  async delete({ id }: AlunoHasConquistasDelete) {
    await prisma.aluno_has_conquista.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, progress, id_aluno, id_conquista }: AlunoHasConquistasUpdate) {
    await prisma.aluno_has_conquista.update({
      where: {
        id
      },
      data: {
        progress,
        id_aluno,
        id_conquista
      }
    })
  };
}