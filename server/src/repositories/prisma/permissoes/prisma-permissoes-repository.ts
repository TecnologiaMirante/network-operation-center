import { prisma } from "../../../prisma";
import { PermissaoCreateData, PermissaoDelete, PermissaoFind, PermissaoUpdate, PermissoesRepository} from "../../interfaces/permissoes/permissoes-repository";

export class PrismaPermissoesRepository implements PermissoesRepository {
  
  async create({ description }: PermissaoCreateData) {
    await prisma.permissao.create({
      data: {
        description,
      }
    });
  };

  async get() {
    const permissoes = await prisma.permissao.findMany();
    return permissoes;
  };

  async find({ id }: PermissaoFind ) {
    const permissao = await prisma.permissao.findUnique(
      {
        where: {
          id,
        }
      }
    );
    return permissao;
  };

  async delete({ id }: PermissaoDelete){
    await prisma.permissao.delete({
      where: {
        id,
      }
    });
  };

  async update({ id, description }: PermissaoUpdate){
    await prisma.permissao.update({
      where: {
        id,
      },
      data: {
        description,
      }
    })
  };

}