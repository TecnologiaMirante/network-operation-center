import { prisma } from "../../../prisma";
import { ConteudoHasAulasCreateData, ConteudoHasAulasRepository, ConteudoHasAulasFind, ConteudoHasAulasDelete, ConteudoHasAulasUpdate, ConteudoHasAulasCreateManyData, ConteudoHasAulasDeleteManyData } from "../../interfaces/conteudos/conteudo-has-aulas-repository";

export class PrismaConteudoHasAulasRepository implements ConteudoHasAulasRepository {

  async create( { id_conteudo, id_aula }: ConteudoHasAulasCreateData ) {
    return await prisma.conteudo_has_aula.create({
      data: {
        id_conteudo, 
        id_aula
      }
    })
  };

  async createMany({ data }: ConteudoHasAulasCreateManyData) {
    return await prisma.conteudo_has_aula.createMany({
      data
    })
  }

  async get() {
    const conteudos = await prisma.conteudo_has_aula.findMany();
    return conteudos;
  }

  async find({ id }: ConteudoHasAulasFind) {
    return await prisma.conteudo_has_aula.findUnique(
      {
        where: {
          id
        },
        include: {
          conteudo: true,
          aula: true,
        }
      }
    );
  }

  async delete({ id }: ConteudoHasAulasDelete) {
    await prisma.conteudo_has_aula.delete({
      where: {
        id,
      }
    });
  }

  async deleteMany({ id_conteudo }: ConteudoHasAulasDeleteManyData) {
    await prisma.conteudo_has_aula.deleteMany({
      where: {
        id_conteudo,
      }
    });
  }

  async update({ id, id_conteudo, id_aula }: ConteudoHasAulasUpdate) {
    await prisma.conteudo_has_aula.update({
      where: {
        id
      },
      data: {
        id_conteudo, 
        id_aula
      }
    })
  };
}