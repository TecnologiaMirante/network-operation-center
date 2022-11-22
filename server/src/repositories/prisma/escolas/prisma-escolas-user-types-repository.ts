import { prisma } from "../../../prisma";
import { EscolaUserTypeCreateData, EscolaUserTypesRepository, EscolaUserTypeFind, EscolaUserTypeDelete, EscolaUserTypeUpdate } from "../../interfaces/escolas/escolas-user-types-repository";

export class PrismaEscolaUserTypesRepository implements EscolaUserTypesRepository {

  async create( { name }: EscolaUserTypeCreateData ) {
    await prisma.escolaUserType.create({
      data: {
        name,
      }
    })
  };

  async get() {
    const escolaUserTypes = await prisma.escolaUserType.findMany();
    return escolaUserTypes;
  }

  async find({ id }: EscolaUserTypeFind) {
    const escolaUserType = await prisma.escolaUserType.findUnique(
      {
        where: {
          id
        }
      }
    );
    return escolaUserType;
  }

  async delete({ id }: EscolaUserTypeDelete) {
    await prisma.escolaUserType.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, name }: EscolaUserTypeUpdate) {
    await prisma.escolaUserType.update({
      where: {
        id
      },
      data: {
        name,
      }
    })
  };
}