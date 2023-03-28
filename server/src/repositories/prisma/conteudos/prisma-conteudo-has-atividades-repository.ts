import { prisma } from "../../../prisma";
import { ConteudoHasAtividadesCreateData, ConteudoHasAtividadesRepository, ConteudoHasAtividadesFind, ConteudoHasAtividadesDelete, ConteudoHasAtividadesUpdate, ConteudoHasAtividadesCreateManyData, ConteudoHasAtividadesDeleteManyData } from "../../interfaces/conteudos/conteudo-has-atividades-repository";

export class PrismaConteudoHasAtividadesRepository implements ConteudoHasAtividadesRepository {

  async create( { id_conteudo, id_atividade }: ConteudoHasAtividadesCreateData ) {
    return await prisma.conteudo_has_atividade.create({
      data: {
        id_conteudo, 
        id_atividade
      }
    })
  };

  async createMany({ data }: ConteudoHasAtividadesCreateManyData) {
    return await prisma.conteudo_has_atividade.createMany({
      data
    })
  }

  async get() {
    const conteudos = await prisma.conteudo_has_atividade.findMany();
    return conteudos;
  }

  async find({ id }: ConteudoHasAtividadesFind) {
    return await prisma.conteudo_has_atividade.findUnique(
      {
        where: {
          id
        },
        include: {
          conteudo: true,
          atividade: true,
        }
      }
    );
  }

  async delete({ id }: ConteudoHasAtividadesDelete) {
    await prisma.conteudo_has_atividade.delete({
      where: {
        id,
      }
    });
  }

  async deleteMany({ id_conteudo }: ConteudoHasAtividadesDeleteManyData) {
    await prisma.conteudo_has_atividade.deleteMany({
      where: {
        id_conteudo,
      }
    });
  }

  async update({ id, id_conteudo, id_atividade }: ConteudoHasAtividadesUpdate) {
    await prisma.conteudo_has_atividade.update({
      where: {
        id
      },
      data: {
        id_conteudo, 
        id_atividade
      }
    })
  };
}