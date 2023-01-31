import { prisma } from "../../../prisma";
import { RankCreateData, GetRankByAluno, RanksRepository, RankDelete, RankUpdate } from "../../interfaces/ranks/ranks-repository";

export class PrismaRanksRepository implements RanksRepository {

  async create( { id_aluno, points }: RankCreateData ) {
    return await prisma.rank.create({
      data: {
        id_aluno,
        points
      }
    })
  };

  async get() {
    const ranks = await prisma.rank.findMany();
    return ranks;
  }

  async getByAluno({ id_aluno }: GetRankByAluno) {

    // Pegando dados do aluno
    const dados_aluno = await prisma.aluno.findFirst({
      where: {
        id: id_aluno
      },
      select: {
        turma: {
          select: {
            id: true,
            serie: {
              select: {
                id: true,
                name: true
              }
            },
            Aluno: {
              select: {
                id: true,
                escola_user: {
                  select: {
                    name: true,
                  }
                },
                points: true
              }
            }
          }
        },
        escola_user: {
          select: {
            escola: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
    });

    // Coletando os ID's
    const escola_id = dados_aluno?.escola_user?.escola?.id;
    const serie_id = dados_aluno?.turma?.serie?.id;
    const turma_id = dados_aluno?.turma?.id

    // // SÉRIE -----------------------------------------------------

    const alunos_serie = await prisma.rank.findMany({
      where: {
        aluno: {
          turma: {
            id_serie: serie_id
          }
        },
      },
      select: {
        aluno: {
          select: {
            id: true,
            escola_user: {
              select: {
                name: true
              }
            },
            points: true
          },
        }
      },
      orderBy: {
        aluno: {
          points: "desc"
        }
      }
    })

    // Classificação do aluno na serie
    let position_serie = alunos_serie.findIndex((e: Object) => Object(e).aluno.id == id_aluno);
    position_serie += 1

    // Organizando os dados da turma
    for (let aux of alunos_serie) {
      Object(aux).name = aux.aluno?.escola_user?.name
      Object(aux).points = Math.round(Object(aux).aluno.points)
      delete Object(aux).aluno
    }

    // Mantendo somente os 3 primeiros itens
    const top_3_rank_serie = [];

    for (let i = 0; i < 3; i++) {

      if (alunos_serie[i] != null) {
        top_3_rank_serie.push(alunos_serie[i]);
      }
    }

    const serie = [];
    serie.push(...top_3_rank_serie)
    serie.push({
      my_position: position_serie
    })

    // // TURMA -----------------------------------------------------
    const alunos_turma = await prisma.rank.findMany({
      where: {
        aluno: {
          id_turma: turma_id
        },
      },
      select: {
        aluno: {
          select: {
            id: true,
            escola_user: {
              select: {
                name: true
              }
            },
            points: true
          },
        }
      },
      orderBy: {
        aluno: {
          points: "desc"
        }
      }
    })

    // Classificação do aluno na turma
    let position_turma = alunos_turma.findIndex((e: Object) => Object(e).aluno.id == id_aluno);
    position_turma += 1

    // Organizando os dados da turma
    for (let aux of alunos_turma) {
      Object(aux).name = aux.aluno?.escola_user?.name
      Object(aux).points = Math.round(Object(aux).aluno.points)
      delete Object(aux).aluno
    }

    // Mantendo somente os 3 primeiros itens
    const top_3_rank_turma = [];

    for (let i = 0; i < 3; i++) {

      if (alunos_turma[i] != null) {
        top_3_rank_turma.push(alunos_turma[i]);
      }
    }

    const turma = [];
    turma.push(...top_3_rank_turma)
    turma.push({
      my_position: position_turma
    })

    // // ESCOLA -----------------------------------------------------
    const alunos_escola = await prisma.rank.findMany({
      where: {
        aluno: {
          escola_user: {
            escola: {
              id: escola_id
            }
          }
        },
      },
      select: {
        aluno: {
          select: {
            id: true,
            escola_user: {
              select: {
                name: true
              }
            },
            points: true
          },
        }
      },
      orderBy: {
        aluno: {
          points: "desc"
        }
      }
    })

    // Classificação do aluno na turma
    let index = alunos_escola.findIndex((e: Object) => Object(e).aluno.id == id_aluno);
    let position_escola = index;
    position_escola += 1

    const points_aluno = Math.round(Object(alunos_escola[index]).aluno.points);

    // Organizando os dados da turma
    for (let aux of alunos_escola) {
      Object(aux).name = aux.aluno?.escola_user?.name
      Object(aux).points = Math.round(Object(aux).aluno.points)
      delete Object(aux).aluno
    }

    // Mantendo somente os 3 primeiros itens
    const top_3_rank_escola = [];

    for (let i = 0; i < 3; i++) {

      if (alunos_escola[i] != null) {
        top_3_rank_escola.push(alunos_escola[i]);
      }
    }

    const escola = [];
    escola.push(...top_3_rank_escola)
    escola.push({
      my_position: position_escola
    })


    // IMAGENS DAS MEDALHAS --------------------------------------
    const imgs = await prisma.rank_img.findMany();

    const img_array = [];
    
    img_array.push(imgs[0].first)
    img_array.push(imgs[0].second)
    img_array.push(imgs[0].third)

    let i = 0;

    // ORGANIZANDO AS IMGS DAS MEDALHAS
    for (let dado of turma) {
      Object(dado).img = img_array[i]
      i++;
    }
    i = 0;
    
    for (let dado of serie) {
      Object(dado).img = img_array[i]
      i++;
    }

    i = 0;
    for (let dado of escola) {
      Object(dado).img = img_array[i]
      i++;
    }


    // RETURNANDO DADOS ------------------------------------------

    // const dados = {
    //   serie,
    //   turma,
    //   escola,
    //   points: points_aluno,
    //   imgs: img_array,
    // }

    const dados = {
      serie,
      turma,
      escola,
      points: points_aluno
    }

    return dados
  }

  async delete({ id }: RankDelete) {
    await prisma.rank.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, id_aluno, points }: RankUpdate) {
    await prisma.rank.update({
      where: {
        id
      },
      data: {
        id_aluno,
        points
      }
    })
  };
}