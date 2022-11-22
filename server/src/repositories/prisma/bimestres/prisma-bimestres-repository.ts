import { prisma } from "../../../prisma";
import { BimestreCreateData, BimestresRepository, BimestreFind, BimestreDelete, BimestreUpdate } from "../../interfaces/bimestres/bimestres-repository";

export class PrismaBimestresRepository implements BimestresRepository {

  async create( { number, start, end }: BimestreCreateData ) {
    return await prisma.bimestre.create({
      data: {
        number,
        start,
        end,
      }
    })
  };

  async get() {
    const bimestres = await prisma.bimestre.findMany({
      select: {
        id: true,
        number: true,
        start: true,
        end: true
      }
    });
    return bimestres;
  }

  async find({ id }: BimestreFind) {
    const bimestre = await prisma.bimestre.findUnique(
      {
        where: {
          id
        },
      }
    );
    return bimestre;
  }

  async delete({ id }: BimestreDelete) {
    await prisma.bimestre.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, number, start, end }: BimestreUpdate) {
    await prisma.bimestre.update({
      where: {
        id
      },
      data: {
        number,
        start,
        end,
      }
    })
  };
}