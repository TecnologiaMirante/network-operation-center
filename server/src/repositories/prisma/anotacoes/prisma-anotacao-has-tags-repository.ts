import { prisma } from "../../../prisma";
import { AnotacaoHasTagCreateData, AnotacaoHasTagsRepository, AnotacaoHasTagFind, AnotacaoHasTagDelete, AnotacaoHasTagUpdate, AnotacaoHasTagGetTagsByAnotacao, AnotacaoHasTagDeleteAll } from "../../interfaces/anotacoes/anotacao-has_tags-repository";

export class PrismaAnotacaoHasTagsRepository implements AnotacaoHasTagsRepository {

  async create( { id_anotacao, id_tag }: AnotacaoHasTagCreateData ) {
    return await prisma.anotacao_has_tags.create({
      data: {
        id_anotacao,
        id_tag
      }
    })
  };

  async get() {
    const anotacoes = await prisma.anotacao_has_tags.findMany();
    return anotacoes;
  }

  async getTagsByAnotacao({ id_anotacao }: AnotacaoHasTagGetTagsByAnotacao) {
    const tags = await prisma.anotacao_has_tags.findMany({
      where: {
        id_anotacao,
      },
      select: {
        tag: {
          select: {
            name: true
          }
        }
      }
    });
    return tags;
  }

  async find({ id }: AnotacaoHasTagFind) {
    const anotacao = await prisma.anotacao_has_tags.findUnique(
      {
        where: {
          id
        },
        include: {
          anotacao: true,
          tag: true
        }
      }
    );
    return anotacao;
  }

  async delete({ id }: AnotacaoHasTagDelete) {
    await prisma.anotacao_has_tags.delete({
      where: {
        id,
      }
    });
  }

  async deleteAllTagsByAnotacao({ id_anotacao }: AnotacaoHasTagDeleteAll) {
    await prisma.anotacao_has_tags.deleteMany({
      where: {
        id_anotacao
      }
    });
  }

  async update({ id, id_anotacao, id_tag }: AnotacaoHasTagUpdate) {
    await prisma.anotacao_has_tags.update({
      where: {
        id
      },
      data: {
        id_anotacao,
        id_tag
      }
    })
  };
}