import { prisma } from "../../../prisma";
import { FavoritoCreateData, FavoritosRepository, FavoritoFind, FavoritoFindByAluno, FavoritoDelete, FavoritoUpdate, FavoritoFindByData } from "../../interfaces/favoritos/favoritos";

export class PrismaFavoritosRepository implements FavoritosRepository {

  async create( { id_aluno, id_aula }: FavoritoCreateData ) {
    return await prisma.favorito.create({
      data: {
        id_aluno, 
        id_aula,
      }
    })
  };

  async get() {
    const favoritos = await prisma.favorito.findMany();
    return favoritos;
  }

  async find({ id }: FavoritoFind) {
    const favorito = await prisma.favorito.findFirst(
      {
        where: {
          id
        },
        include: {
          aluno: true,
          aula: {
            select: {
              id: true,
              Conteudo_has_aula: {
                select: {
                  id_conteudo: true
                }
              }
            }
          },
        }
      }
    );
    
    return favorito;
  }

  async findByAluno({ id_aluno }: FavoritoFindByAluno) {
    const favoritos = await prisma.favorito.findMany(
      {
        where: {
          id_aluno
        },
        select: {
          id: true,
          aula: {
            select: {
              id: true,
              title: true,
              thumb: true,
              file: true,
              Conteudo_has_itens: {
                select: {
                  id_conteudo: true
                }
              }
              // conteudo: {
              //   select: {
              //     id: true
              //   }
              // }
            }
          },
        }
      }
    );

    let array_favoritos = [];

    for (let favorito of favoritos) {

      if (favorito.aula.Conteudo_has_itens.length != 0) {
        const data = {
          id_favorito: favorito.id,
          id_aula: favorito.aula.id,
          title: favorito.aula.title,
          file: favorito.aula.file,
          thumb: favorito.aula.thumb,
          conteudo: favorito.aula.Conteudo_has_itens[0].id_conteudo,
        }
        array_favoritos.push(data)
      }
    }

    return array_favoritos;
  }

  async findByData({id_aluno, id_aula} : FavoritoFindByData) {
    return await prisma.favorito.findFirst({
      where: {
        id_aluno,
        id_aula
      }
    })
  }


  async delete({ id }: FavoritoDelete) {
    await prisma.favorito.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, id_aluno, id_aula }: FavoritoUpdate) {
    await prisma.favorito.update({
      where: {
        id
      },
      data: {
        id_aluno, 
        id_aula,
      }
    })
  };
}