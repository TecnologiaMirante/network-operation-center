import { prisma } from "../../../prisma";
import { SecretariaCreateData, SecretariaDelete, SecretariaFind, SecretariasRepository, SecretariaUpdate} from "../../interfaces/secretarias/secretarias-repository";

export class PrismaSecretariasRepository implements SecretariasRepository {
  
  async create({ name }: SecretariaCreateData) {
    return await prisma.secretaria.create({
      data: {
        name,
      }
    });
  };

  async get() {
    const secretarias = await prisma.secretaria.findMany();
    return secretarias;
  };

  async find({ id }: SecretariaFind ) {
    const secretaria = await prisma.secretaria.findUnique(
      {
        where: {
          id,
        }
      }
    );
    return secretaria;
  };

  async delete({ id }: SecretariaDelete){
    await prisma.secretaria.delete({
      where: {
        id,
      }
    });
  };

  async update({ id, name }: SecretariaUpdate){
    await prisma.secretaria.update({
      where: {
        id,
      },
      data: {
        name,
      }
    })
  };

}