import { prisma } from "../../../prisma";
import { SerieHasDisciplinasCreateData, SerieHasDisciplinasRepository, SerieHasDisciplinasFind, SerieHasDisciplinasDelete, SerieHasDisciplinasUpdate, SerieHasDisciplinasExistsBetweenSerieDisciplina } from "../../interfaces/series/serie-has-disciplinas-repository";

export class PrismaSerieHasDisciplinasRepository implements SerieHasDisciplinasRepository {

  async create( { id_serie, id_disciplina }: SerieHasDisciplinasCreateData ) {
    return await prisma.serieHasDisciplina.create({
      data: {
        id_disciplina,
        id_serie
      }
    })
  };

  async get() {
    const serieHasDisciplina = await prisma.serieHasDisciplina.findMany({
      include: {
        serie: {
          select: {
            name: true
          }
        },
        disciplina: {
          select: {
            name: true
          }
        }
      }
    });
    return serieHasDisciplina;
  }

  async find({ id }: SerieHasDisciplinasFind) {
    const serieHasDisciplina = await prisma.serieHasDisciplina.findUnique(
      {
        where: {
          id
        },
        include: {
          serie: true,
          disciplina: {
            select: { name: true }
          }
        }
      }
    );
    return serieHasDisciplina;
  }

  async findRelation({ id_disciplina, id_serie }: SerieHasDisciplinasExistsBetweenSerieDisciplina) {

    return await prisma.serieHasDisciplina.findFirst({
      where: {
        id_disciplina,
        id_serie
      }
    });
    

  }

  async delete({ id }: SerieHasDisciplinasDelete) {
    await prisma.serieHasDisciplina.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, id_serie, id_disciplina }: SerieHasDisciplinasUpdate) {
    await prisma.serieHasDisciplina.update({
      where: {
        id
      },
      data: {
        id,
        id_disciplina,
        id_serie
      }
    })
  };
}