import { prisma } from "../../../prisma";
import { TurmaCreateData, TurmasRepository, TurmaFind, TurmaDelete, TurmaUpdate, shift_turma, status_turma, TurmaGetSerieByTurma } from "../../interfaces/turmas/turmas-repository";

export class PrismaTurmasRepository implements TurmasRepository {

  async create( { name, code, shift, year, status, id_serie }: TurmaCreateData ) {
    return await prisma.turma.create({
      data: {
        name,
        code,
        shift,
        year,
        status,
        id_serie
      }
    })
  };

  async get() {
    const turmas = await prisma.turma.findMany({
      orderBy: {
        name: "asc"
      }
    });

    return turmas;
  }

  async getSerieByTurma( { id }: TurmaGetSerieByTurma) {
    const serie = await prisma.turma.findFirst({
      where: {
        id,
      },
      select: {
        serie: {
          select: {
            id: true
          }
        }
      }
    });

    return serie;
  }

  async find({ id }: TurmaFind) {
    const turma = await prisma.turma.findUnique(
      {
        where: {
          id
        },
      }
    );
    return turma;
  }

  async delete({ id }: TurmaDelete) {
    await prisma.turma.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, name, code, shift, year, status, id_serie }: TurmaUpdate) {
    await prisma.turma.update({
      where: {
        id
      },
      data: {
        name,
        code,
        shift,
        year,
        status,
        id_serie
      }
    })
  };
}