import { prisma } from "../../../prisma";
import { OpcaoCreateData, OpcoesRepository, OpcaoFind, OpcaoDelete, OpcaoUpdate, OpcaoCreateMany } from "../../interfaces/opcoes/opcoes-repository";

export class PrismaOpcoesRepository implements OpcoesRepository {

  async create( { description, is_correct, id_questao }: OpcaoCreateData ) {
    return await prisma.opcao.create({
      data: {
        description,
        is_correct,
        id_questao
      }
    })
  };

  async createMany( { data }: OpcaoCreateMany ) {
    await prisma.opcao.createMany({
      data,
    })
  };

  async get() {
    const opcoes = await prisma.opcao.findMany();
    return opcoes;
  }

  async find({ id }: OpcaoFind) {
    const opcao = await prisma.opcao.findUnique(
      {
        where: {
          id
        },
      }
    );
    return opcao;
  }

  async delete({ id }: OpcaoDelete) {
    await prisma.opcao.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, description, is_correct, id_questao }: OpcaoUpdate) {
    await prisma.opcao.update({
      where: {
        id
      },
      data: {
        description,
        is_correct,
        id_questao
      }
    })
  };
}