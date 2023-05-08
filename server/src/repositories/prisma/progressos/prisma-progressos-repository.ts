import { prisma } from "../../../prisma";
import { ProgressoCreateData, ProgressosRepository, ProgressoFind, ProgressoDelete, ProgressoUpdate, ProgressoFindByData } from "../../interfaces/progressos/progressos-repository";

export class PrismaProgressosRepository implements ProgressosRepository {

  async create( { id_aluno, id_aula, progress, id_bimestre }: ProgressoCreateData ) {
    return await prisma.progresso.create({
      data: {
        id_aluno, 
        id_aula, 
        progress,
        id_bimestre
      }
    })
  };

  async get() {
    const progress = await prisma.progresso.findMany();
    return progress;
  }

  async find({ id }: ProgressoFind) {
    const questao = await prisma.progresso.findUnique(
      {
        where: {
          id
        },
        include: {
          aluno: {
            select: {
              escola_user: {
                select: {
                  name: true
                }
              }
            },
          },
          aula: {
            select: {
              title: true
            }
          }
        }
      }
    );
    return questao;
  }

  async findByData({ id_aluno, id_aula }: ProgressoFindByData) {
    const questao = await prisma.progresso.findFirst(
      {
        where: {
          id_aluno, id_aula
        },
        include: {
          aluno: {
            select: {
              escola_user: {
                select: {
                  name: true
                }
              }
            },
          },
          aula: {
            select: {
              title: true
            }
          }
        }
      }
    );
    return questao;
  }

  async delete({ id }: ProgressoDelete) {
    await prisma.progresso.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, id_aluno, id_aula, progress, id_bimestre }: ProgressoUpdate) {
    await prisma.progresso.update({
      where: {
        id
      },
      data: {
        id_aluno, 
        id_aula, 
        progress, 
        id_bimestre
      }
    })
  };
}