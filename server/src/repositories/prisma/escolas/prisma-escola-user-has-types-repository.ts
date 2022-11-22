import { prisma } from "../../../prisma";
import { EscolaUserHasTypeCreateData, EscolaUserHasTypesRepository, EscolaUserHasTypeFind, EscolaUserHasTypeFindByUser, EscolaUserHasTypeDelete, EscolaUserHasTypeUpdate } from "../../interfaces/escolas/escola-user-has-types-repository";

export class PrismaEscolaUserHasTypesRepository implements EscolaUserHasTypesRepository {

  async create( { id_escola_user, id_type }: EscolaUserHasTypeCreateData ) {
    await prisma.escolaUser_has_type.create({
      data: {
        id_escola_user,
        id_type,
      }
    })
  };

  async get() {
    const escolaUserHasTypes = await prisma.escolaUser_has_type.findMany();
    return escolaUserHasTypes;
  }

  async find({ id }: EscolaUserHasTypeFind) {
    const escolaUserHasType = await prisma.escolaUser_has_type.findUnique(
      {
        where: {
          id
        },
        include: {
          escola_user: true,
          escola_user_type: true
        }
      }
    );
    return escolaUserHasType;
  }

  async findByUser({ id_escola_user }: EscolaUserHasTypeFindByUser) {
    const escolaUserHasType = await prisma.escolaUser_has_type.findFirst(
      {
        where: {
          id_escola_user
        },
        include: {
          escola_user: true,
          escola_user_type: true
        }
      }
    );
    return escolaUserHasType;
  }

  async delete({ id }: EscolaUserHasTypeDelete) {
    await prisma.escolaUser_has_type.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, id_escola_user, id_type }: EscolaUserHasTypeUpdate) {
    await prisma.escolaUser_has_type.update({
      where: {
        id
      },
      data: {
        id_escola_user,
        id_type,
      }
    })
  };
}