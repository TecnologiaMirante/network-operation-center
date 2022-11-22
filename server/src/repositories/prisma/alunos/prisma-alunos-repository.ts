import { prisma } from "../../../prisma";
import { AlunoCreateData, AlunosRepository, AlunoFind, AlunoFindByUser, AlunoDelete, AlunoUpdate } from "../../interfaces/alunos/alunos-repository";

export class PrismaAlunosRepository implements AlunosRepository {

  async create( { id_escola_user, id_turma }: AlunoCreateData ) {
    return await prisma.aluno.create({
      data: {
        id_escola_user,
        id_turma
      }
    })
  };

  async get() {
    const alunos = await prisma.aluno.findMany({
      orderBy: {
        escola_user: {
          name: "asc"
        }
      },
      include: {
        escola_user: {
          select: {
            name: true,
            mat: true
          }
        }
      }
    });
    return alunos;
  }

  async find({ id }: AlunoFind) {
    const aluno = await prisma.aluno.findUnique(
      {
        where: {
          id
        },
        select: {
          id: true,
          points: true,
          escola_user: {
            select: {
              name: true,
              avatar: true,
              mat: true,
              escola: {
                select: {
                  name: true
                }
              },
            }
          },
          turma: {
            include: {
              serie: {
                select: {
                  Aula: {
                    orderBy: {
                      title: "asc"
                    }
                  }
                }
              }
            }
          },
        }
      }
    );
    
    const aluno_final = {
      id: aluno?.id,
      // avatar: aluno?.escola_user?.avatar,
      points: aluno?.points,
      name: aluno?.escola_user?.name,
      mat: aluno?.escola_user?.mat,
      escola_name: aluno?.escola_user?.escola?.name,
      turma_name: aluno?.turma?.name,
    }

    return aluno_final;
  }

  async findByUser({ id_escola_user }: AlunoFindByUser) {
    const aluno = await prisma.aluno.findFirst(
      {
        where: {
          id_escola_user
        },
        include: {
          escola_user: true,
          turma: true
        }
      }
    );
    return aluno;
  }


  async delete({ id }: AlunoDelete) {
    await prisma.aluno.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, id_escola_user, id_turma }: AlunoUpdate) {
    await prisma.aluno.update({
      where: {
        id
      },
      data: {
        id_escola_user,
        id_turma
      }
    })
  };
}