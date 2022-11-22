import { Atividade, Aula } from "@prisma/client";
import { prisma } from "../../../prisma";
import { AulaCreateData, AulasRepository, AulaFind, AulaDelete, AulaUpdate, AulaIsInConteudo, AulaFindByHash, AulaGetBySerie, AulaGetBySerieDisciplina, AulaGetBySerieDisciplinaProfessor, AulaGetLastAulas } from "../../interfaces/aulas/aulas-repository";

export class PrismaAulasRepository implements AulasRepository {

  async create( { hash, title, file, thumb, time, id_serie, id_disciplina }: AulaCreateData ) {
    
    // Todas as aulas possuem um nome característico da seguinte forma: <número (1 digito) - número (2 digitos) - Titulo - .mp4>
    // Irei realizar um procedimento tal que só permaneça o título, então bora ...

    let final_title;
    final_title = title.substring(9);
    final_title = final_title.slice(0, -4);
    
    return await prisma.aula.create({
      data: {
        hash, 
        title: final_title, 
        file, 
        thumb,
        time, 
        id_serie, 
        id_disciplina
      },
    })
  };

  async get() {
    const aulas = await prisma.aula.findMany({
      orderBy: {
        disciplina: {
          name: "asc"
        }
      }
    });

   return aulas;
  }

  async find({ id }: AulaFind) {
    const aula = await prisma.aula.findUnique(
      {
        where: {
          id
        },
      }
    );
    return aula;
  }
  
  async findByhash({ hash }: AulaFindByHash) {
    const aula = await prisma.aula.findFirst(
      {
        where: {
          hash
        },
      }
    );
    return aula;
  }

  async getBySerie({ id_serie }: AulaGetBySerie) {
    const aulas = await prisma.aula.findMany(
      {
        where: {
          id_serie,
        },
        orderBy: {
          disciplina: {
            name: "asc"
          }
        }
      }
    )

    return aulas;
  }

  async getBySerieDisciplina({ id_serie, id_disciplina }: AulaGetBySerieDisciplina) {
    const aulas = await prisma.aula.findMany(
      {
        where: {
          id_serie, id_disciplina
        },
        orderBy: {
          disciplina: {
            name: "asc"
          }
        }
      }
    )

    return aulas;
  }

  async getBySerieDisciplinaProfessor ({ id_serie, id_disciplina }: AulaGetBySerieDisciplinaProfessor) {
    const aulas = await prisma.aula.findMany(
      {
        where: {
          id_serie, id_disciplina
        },
        orderBy: {
          disciplina: {
            name: "asc"
          }
        }
      }
    );

    const atividades = await prisma.atividade.findMany({
      where: {
        id_serie, id_disciplina
       }
    });



    return {aulas, atividades};
  }

  async delete({ id }: AulaDelete) {
    await prisma.aula.delete({
      where: {
        id,
      }
    });
  }

  async deleteAll() {
    await prisma.aula.deleteMany();
  }

  async update({ id, hash, title, file, rating, thumb, time, id_conteudo, id_serie, id_disciplina }: AulaUpdate) {
    
    let final_title;
    if(title) {
      final_title = title.substring(9);
      final_title = final_title.slice(0, -4);
    }
    
    await prisma.aula.update({
      where: {
        id
      },
      data: {
        hash, 
        title:final_title, 
        file, 
        rating, 
        thumb,
        time, 
        id_serie, 
        id_disciplina
      }
    })
  };

  // Quando organizar o conteúdo, o id dele vem pra cá
  async inConteudo({ id, id_conteudo }: AulaIsInConteudo) {
    await prisma.aula.update({
      where: {
        id,
      },
      data: {
      }
    })
  }

  async getLastAulas({ id_aluno }: AulaGetLastAulas) {
    let aulas = await prisma.progresso.findMany({
      where: {
        id_aluno
      },
      select: {
        aula: {
          select: {
            id: true,
            title: true,
            thumb: true,
            file: true,
            Conteudo_has_itens: {
              select: {
                id_conteudo: true
              },
            }
          }
        }
      },
      orderBy: {
        updated_at: "desc"
      }
    });

    let last_aulas = [];

    for (let item of aulas) {

      Object(item).aula.conteudo = item.aula.Conteudo_has_itens
      delete Object(item).aula.Conteudo_has_itens;
      
      if (Object(item).aula.conteudo.length != 0) {
        Object(item).aula.conteudo = Object(item).aula.conteudo[0].id_conteudo
      }

      last_aulas.push(item.aula)
    }

    return last_aulas;
  }
}