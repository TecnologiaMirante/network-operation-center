import { prisma } from "../../../prisma";
import { EscolaCreateData, EscolasRepository, EscolaFind, EscolaDelete, EscolaUpdate } from "../../interfaces/escolas/escolas-repository";

export class PrismaEscolasRepository implements EscolasRepository {

  async create( { name, school_type, id_secretaria }: EscolaCreateData ) {
    return await prisma.escola.create({
      data: {
        name,
        school_type,
        id_secretaria,
      }
    })
  };

  async get() {
    const escolas = await prisma.escola.findMany();
    return escolas;
  }

  async find({ id }: EscolaFind) {
    const escola = await prisma.escola.findUnique(
      {
        where: {
          id
        },
        include: {
          secretaria: true
        }
      }
    );
    return escola;
  }

  async delete({ id }: EscolaDelete) {
    await prisma.escola.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, name, school_type, id_secretaria }: EscolaUpdate) {
    await prisma.escola.update({
      where: {
        id
      },
      data: {
        name,
        school_type,
        id_secretaria,
      }
    })
  };
}