import { prisma } from "../../../prisma";
import { Type_has_permissoesCustomCreateData, Type_has_permissoesCustomDelete, Type_has_permissoesCustomFind, Type_has_permissoesCustomUpdate, Type_has_permissoesCustomRepository} from "../../interfaces/permissoes/user-type-has-permissoes-custom-repository";

export class PrismaUserTypeHasPermissoesCustomRepository implements Type_has_permissoesCustomRepository {
  
  async create({ id_type, id_permissao, id_escola_user }: Type_has_permissoesCustomCreateData) {
    await prisma.type_has_permissao_custom.create({
      data: {
        id_type,
        id_permissao,
        id_escola_user
      }
    });
  };

  async get() {
    const permissoes = await prisma.type_has_permissao_custom.findMany();
    return permissoes;
  };

  async find({ id }: Type_has_permissoesCustomFind ) {
    const type_has_permissoes = await prisma.type_has_permissao_custom.findUnique(
      {
        where: {
          id,
        },
        include: {
          escola_user: true,
          escola_user_type: true,
          permissao: true,
        }
      }
    );
    return type_has_permissoes;
  };

  async delete({ id }: Type_has_permissoesCustomDelete){
    await prisma.type_has_permissao_custom.delete({
      where: {
        id,
      }
    });
  };

  async update({ id, id_type, id_permissao, id_escola_user }: Type_has_permissoesCustomUpdate){
    await prisma.type_has_permissao_custom.update({
      where: {
        id,
      },
      data: {
        id_type, 
        id_permissao,
        id_escola_user
      }
    })
  };

}