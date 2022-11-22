import { prisma } from "../../../prisma";
import { ConteudoHasItensCreateData, ConteudoHasItensRepository, ConteudoHasItensFind, ConteudoHasItensDelete, ConteudoHasItensUpdate, ConteudoHasItensDeleteManyData } from "../../interfaces/conteudos/conteudo-has-itens-repository";

export class PrismaConteudoHasItensRepository implements ConteudoHasItensRepository {

  async create( { type, id_conteudo, id_aula, id_atividade }: ConteudoHasItensCreateData ) {
    return await prisma.conteudo_has_itens.create({
      data: {
        type,
        id_conteudo, 
        id_aula,
        id_atividade
      }
    })
  };

  async get() {
    const conteudos = await prisma.conteudo_has_itens.findMany();
    return conteudos;
  }

  async find({ id }: ConteudoHasItensFind) {
    return await prisma.conteudo_has_itens.findUnique(
      {
        where: {
          id
        },
        include: {
          conteudo: true,
          aula: true,
          atividade: true
        }
      }
    );
  }

  async delete({ id }: ConteudoHasItensDelete) {
    await prisma.conteudo_has_itens.delete({
      where: {
        id,
      }
    });
  }

  async deleteMany({ id_conteudo }: ConteudoHasItensDeleteManyData) {
    await prisma.conteudo_has_itens.deleteMany({
      where: {
        id_conteudo,
      }
    });
  }

  async update({ id, type, id_conteudo, id_aula, id_atividade }: ConteudoHasItensUpdate) {
    await prisma.conteudo_has_itens.update({
      where: {
        id
      },
      data: {
        type,
        id_conteudo, 
        id_aula,
        id_atividade
      }
    })
  };
}