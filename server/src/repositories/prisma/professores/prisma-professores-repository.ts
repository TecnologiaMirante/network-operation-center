import { prisma } from "../../../prisma";
import { ProfessorCreateData, ProfessoresRepository, ProfessorFind, ProfessorDelete, ProfessorUpdate } from "../../interfaces/professores/professores-repository";

export class PrismaProfessoresRepository implements ProfessoresRepository {

  async create( { education, experience, description, id_escola_user }: ProfessorCreateData ) {
    return await prisma.professor.create({
      data: {
        education,
        experience,
        description,
        id_escola_user
      }
    })
  };

  async get() {
    const professores = await prisma.professor.findMany({
      include: {
        escola_user: {
          select: {
            id: true,
            name: true,
            mat: true,
          }
        }
      }
    });
    return professores;
  }

  async find({ id }: ProfessorFind) {
    const professor = await prisma.professor.findUnique(
      {
        where: {
          id
        },
        include: {
          escola_user: true,
          _count: {
            select: {
              ProfessorHasDisciplina: true,
            }
          }
        }
      }
    );

    // Buscando quantidade de turmas do professor
    const turmas = await prisma.turma.findMany({
      select: {
        ProfessorHasDisciplinaTurma: {
          where: {
            professor_has_disciplinas: {
              id_professor: id
            }
          },
          select: {
            turma: true
          }
        }
      }
    })

    const turmas_final = [];
    for (let turma of turmas) {
      turmas_final.push(turma.ProfessorHasDisciplinaTurma[0])
    }

    // Buscando quantidade de series do professor
    const series = await prisma.serie.findMany({
      select: {
        Turma: {
          select: {
            ProfessorHasDisciplinaTurma: {
              where: {
                professor_has_disciplinas: {
                  id_professor: id
                }
              },
              select: {
                turma: {
                  select: {
                    id: true,
                    name: true,
                    serie: {
                      select: {
                        id: true,
                        name: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    const series_final_raw = [];
    for (let serie of series) {
      if(serie.Turma.length > 0) {
        series_final_raw.push(serie)
      }
    }

    Object(professor).num_disciplinas = professor?._count.ProfessorHasDisciplina;
    Object(professor).num_turmas = turmas_final.length;
    Object(professor).num_series = series.length;
    delete Object(professor)._count;

    return professor;
  }

  async delete({ id }: ProfessorDelete) {
    await prisma.professor.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, education, experience, description, id_escola_user }: ProfessorUpdate) {
    await prisma.professor.update({
      where: {
        id
      },
      data: {
        education,
        experience,
        description,
        id_escola_user
      }
    })
  };
}