 import { prisma } from "../../../prisma";
import { DisciplinaCreateData, DisciplinasRepository, DisciplinaFind, DisciplinaDelete, DisciplinaUpdate, DisciplinaChangeStatus, DisciplinaGetByAluno } from "../../interfaces/disciplinas/disciplinas-repository";

export class PrismaDisciplinasRepository implements DisciplinasRepository {

  async create( { name, code, id_escola, status }: DisciplinaCreateData ) {
    return await prisma.disciplina.create({
      data: {
        name,
        code,
        id_escola,
        status
      }
    })
  };

  async get() {
    const disciplinas = await prisma.disciplina.findMany({
      orderBy: {
        name: "asc"
      }
    });
    return disciplinas;
  }

  async find({ id }: DisciplinaFind) {
    const disciplina = await prisma.disciplina.findUnique(
      {
        where: {
          id
        },
      }
    );
    return disciplina;
  }

  async getByAluno({ id_aluno }: DisciplinaGetByAluno) {
    
     const turmas = await prisma.aluno.findFirst({
      where: {
        id: id_aluno,
      },
      select: {
        turma: {
          select: {
            serie: {
              select: {
                SerieHasDisciplina: {
                  select: {
                    disciplina: true 
                  }
                }
              }
            }
          }
        }
      }
    });

    const disciplinas = turmas?.turma?.serie?.SerieHasDisciplina;

    if (disciplinas) {
      return disciplinas;
    } else {
      return null;
    }
  }

  async delete({ id }: DisciplinaDelete) {
    await prisma.disciplina.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, name, code, id_escola, status, icon, bk_img, bk_color }: DisciplinaUpdate) {
    await prisma.disciplina.update({
      where: {
        id
      },
      data: {
        name,
        code,
        id_escola,
        status,
        icon,
        bk_img,
        bk_color
      }
    })
  };

  async changeStatus({ id, status }: DisciplinaChangeStatus) {
    await prisma.disciplina.update({
      where: {
        id
      },
      data: {
        status
      }
    })
  }
}