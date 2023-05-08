import { prisma } from "../../../prisma";
import { EscolaUserHasAddressCreateData, EscolaUserHasAddressRepository, EscolaUserHasAddressFind, EscolaUserHasAddressDelete, EscolaUserHasAddressUpdate } from "../../interfaces/escolas/escola-user-has-address-repository";

export class PrismaEscolaUserHasAddressRepository implements EscolaUserHasAddressRepository {

  async create( { state, city, district, number, street, address_continued, zip_code, reference, id_user }: EscolaUserHasAddressCreateData ) {
    await prisma.user_has_address.create({
      data: {
        state, 
        city, 
        district, 
        number, 
        street, 
        address_continued, 
        zip_code, 
        reference, 
        id_user
      }
    })
  };

  async get() {
    const escolaUserHasAddresss = await prisma.user_has_address.findMany();
    return escolaUserHasAddresss;
  }

  async find({ id_user }: EscolaUserHasAddressFind) {
    const escolaUserHasAddress = await prisma.user_has_address.findFirst(
      {
        where: {
          id_user
        }
      }
    );
    return escolaUserHasAddress;
  }

  async delete({ id }: EscolaUserHasAddressDelete) {
    await prisma.user_has_address.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, state, city, district, number, street, address_continued, zip_code, reference, id_user }: EscolaUserHasAddressUpdate) {
    await prisma.user_has_address.update({
      where: {
        id
      },
      data: {
        state, 
        city, 
        district, 
        number, 
        street, 
        address_continued, 
        zip_code, 
        reference, 
        id_user
      }
    })
  };
}