import { prisma } from "../../../prisma";
import { ProfessorHasDisciplinaCreateData, ProfessorHasDisciplinasRepository, ProfessorHasDisciplinaFind, ProfessorHasDisciplinaDelete, ProfessorHasDisciplinaUpdate, ProfessorHasDisciplinaGetDisciplinasByProfessor } from "../../interfaces/professores/professor-has-disciplinas-repository";

export class PrismaProfessorHasDisciplinasRepository implements ProfessorHasDisciplinasRepository {

  async create( { id_professor, id_disciplina }: ProfessorHasDisciplinaCreateData ) {
    return await prisma.professorHasDisciplina.create({
      data: {
        id_professor,
        id_disciplina,
      }
    })
  };

  async get() {
    const professores = await prisma.professorHasDisciplina.findMany();
    return professores;
  }

  async getDisciplinasByProfessor({ id_professor }: ProfessorHasDisciplinaGetDisciplinasByProfessor) {
    const disciplinas = await prisma.professorHasDisciplina.findMany({
      where: {
        id_professor,
      },
      select: {
        disciplina: true
      }
    });

    return disciplinas;
  }

  async find({ id }: ProfessorHasDisciplinaFind) {
    const Professor = await prisma.professorHasDisciplina.findUnique(
      {
        where: {
          id
        },
        include: {          
          professor: {
            include: {
              escola_user: true
            }
          },
          disciplina: true,
        }
      }
    );
    return Professor;
  }

  async delete({ id }: ProfessorHasDisciplinaDelete) {
    await prisma.professorHasDisciplina.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, id_professor, id_disciplina }: ProfessorHasDisciplinaUpdate) {
    await prisma.professorHasDisciplina.update({
      where: {
        id
      },
      data: {
        id_professor,
        id_disciplina,
      }
    })
  };
}