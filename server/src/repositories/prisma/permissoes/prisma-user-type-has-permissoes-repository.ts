import { prisma } from "../../../prisma";
import { Type_has_permissoesCreateData, Type_has_permissoesDelete, Type_has_permissoesFind, Type_has_permissoesUpdate, Type_has_permissoesRepository} from "../../interfaces/permissoes/user-type-has-permissoes-repository";

export class PrismaUserTypeHasPermissoesRepository implements Type_has_permissoesRepository {
  
  async create({ id_type, id_permissao }: Type_has_permissoesCreateData) {
    await prisma.type_has_permissao.create({
      data: {
        id_type,
        id_permissao,
      }
    });
  };

  async get() {
    const permissoes = await prisma.type_has_permissao.findMany();
    return permissoes;
  };

  async find({ id }: Type_has_permissoesFind ) {
    const type_has_permissoes = await prisma.type_has_permissao.findUnique(
      {
        where: {
          id,
        },
        include: {
          escola_user_type: true,
          permissao: true,
        }
      }
    );
    return type_has_permissoes;
  };

  async delete({ id }: Type_has_permissoesDelete){
    await prisma.type_has_permissao.delete({
      where: {
        id,
      }
    });
  };

  async update({ id, id_type, id_permissao }: Type_has_permissoesUpdate){
    await prisma.type_has_permissao.update({
      where: {
        id,
      },
      data: {
        id_type, 
        id_permissao,
      }
    })
  };

}