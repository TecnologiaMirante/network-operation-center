import { prisma } from "../../../prisma";
import { MediaCreateData, MediasRepository, MediaFind, MediaDelete, MediaUpdate, MediaGetByAluno } from "../../interfaces/medias/medias-repository";

export class PrismaMediasRepository implements MediasRepository {

  async create( { value, id_disciplina, id_aluno, id_bimestre }: MediaCreateData ) {
    return await prisma.media.create({
      data: {
        value,
        id_disciplina,
        id_aluno,
        id_bimestre
      }
    })
  };

  async get() {
    const medias = await prisma.media.findMany();
    return medias;
  }

  async getByAluno({ id_aluno }: MediaGetByAluno) {
    const medias = await prisma.media.findMany({
      where: {
        id_aluno
      },     
      select: {
        disciplina: {
          select: {
            name: true
          }
        },
        value: true
      },
    })

    for (let item of medias) {
      Object(item).disciplina = Object.values(item.disciplina)[0]
      Object(item).value = +(Math.round(item.value * 100) / 100).toFixed(1)
    }

    return medias;
  }

  async find({ id }: MediaFind) {
    const media = await prisma.media.findUnique(
      {
        where: {
          id
        },
        include: {
          aluno: true,
          disciplina: true,
        },
      }
    );
    return media;
  }


  async delete({ id }: MediaDelete) {
    await prisma.media.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, value, id_disciplina, id_aluno, id_bimestre }: MediaUpdate) {
    await prisma.media.update({
      where: {
        id
      },
      data: {
        value,
        id_disciplina,
        id_aluno,
        id_bimestre
      }
    })
  };
}