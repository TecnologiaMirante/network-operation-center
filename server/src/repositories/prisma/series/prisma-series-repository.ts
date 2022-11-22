import { prisma } from "../../../prisma";
import { SerieCreateData, SeriesRepository, SerieFind, SerieDelete, SerieUpdate, SerieGetAlunos } from "../../interfaces/series/series-repository";

export class PrismaSeriesRepository implements SeriesRepository {

  async create( { name, id_escola }: SerieCreateData ) {
    return await prisma.serie.create({
      data: {
        name,
        id_escola
      }
    })
  };

  async get() {
    const series = await prisma.serie.findMany({
      orderBy: {
        name: "asc"
      }
    });
    return series;
  }

  async getAlunos( { id }: SerieGetAlunos) {
    const alunos = await prisma.serie.findMany({
      where: {
        id,
      },
      select: {
        Turma: {
          select: {
            name: true,
            Aluno: {
              select: {
                id: true,
                points: true,
                escola_user: {
                  select: {
                    name: true,
                  },                  
                },
                turma: {
                  select: {
                    name: true
                  }
                },                
              },              
            },                        
          },
        },
      },
    });
    
    // Negocio rapido aqui pra ir pro rank --------------

    // const array_alunos = [];

    // for (let aux of alunos[0].Turma[0].Aluno) {
    //   array_alunos.push(aux.id)

    //   await prisma.aluno_responde_atividade.create({
    //     data: {
    //       id_aluno: aux.id,
    //       id_atividade: "71aa286c-013e-4ced-ac1c-4809bb693f7b",
    //       nota: 8.0
    //     }
    //   })

    // }



    // -------------------------------------------------



    const cont = Object(alunos)[0].Turma[0].Aluno.length     

    return {cont, alunos};
  }

  async find({ id }: SerieFind) {
    const serie = await prisma.serie.findUnique(
      {
        where: {
          id
        },
      }
    );
    return serie;
  }

  async delete({ id }: SerieDelete) {
    await prisma.serie.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, name, id_escola }: SerieUpdate) {
    await prisma.serie.update({
      where: {
        id
      },
      data: {
        name,
        id_escola
      }
    })
  };
}