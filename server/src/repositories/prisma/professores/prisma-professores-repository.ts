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
    const Professor = await prisma.professor.findUnique(
      {
        where: {
          id
        },
        include: {
          escola_user: true
        }
      }
    );
    return Professor;
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