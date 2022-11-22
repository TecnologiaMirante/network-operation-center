import { prisma } from "../../../prisma";
import { EscolaUserHasPhoneCreateData, EscolaUserHasPhonesRepository, EscolaUserHasPhoneFind, EscolaUserHasPhoneDelete, EscolaUserHasPhoneUpdate } from "../../interfaces/escolas/escola-user-has-phones-repository";

export class PrismaEscolaUserHasPhonesRepository implements EscolaUserHasPhonesRepository {

  async create( { phone, id_user }: EscolaUserHasPhoneCreateData ) {
    await prisma.user_has_phone.create({
      data: {
        phone,
        id_user,
      }
    })
  };

  async get() {
    const escolaUserHasPhones = await prisma.user_has_phone.findMany();
    return escolaUserHasPhones;
  }

  async find({ id }: EscolaUserHasPhoneFind) {
    const escolaUserHasPhone = await prisma.user_has_phone.findFirst(
      {
        where: {
          id
        }
      }
    );
    return escolaUserHasPhone;
  }

  async delete({ id }: EscolaUserHasPhoneDelete) {
    await prisma.user_has_phone.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, phone, id_user }: EscolaUserHasPhoneUpdate) {
    await prisma.user_has_phone.update({
      where: {
        id
      },
      data: {
        phone,
        id_user,
      }
    })
  };
}