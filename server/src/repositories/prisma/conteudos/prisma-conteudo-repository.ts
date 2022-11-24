import { prisma } from "../../../prisma";
import { ConteudoCreateData, ConteudosRepository, 
  ConteudoFind, 
  ConteudoDelete, ConteudoUpdate, 
  ConteudoGetByAlunoDisciplina, 
  ConteudoFindByAluno, 
  ConteudoGetByProfessor
} from "../../interfaces/conteudos/conteudo-repository";

export class PrismaConteudosRepository implements ConteudosRepository {

  async create( { name, id_disciplina, id_serie, id_bimestre, created_by, status }: ConteudoCreateData ) {
    return await prisma.conteudo.create({
      data: {
        name,
        id_disciplina,
        id_serie,
        id_bimestre,
        created_by,
        status
      }
    })
  };

  async get() {
    const conteudos = await prisma.conteudo.findMany();
    return conteudos;
  }

  async getByProfessor( { created_by }: ConteudoGetByProfessor ) {
    const conteudos = await prisma.conteudo.findMany({
      where: {
        created_by,
      },
      select: {
        id: true,
        name: true,
      }
    });
    return conteudos;
  }

  async getByAlunoDisciplina({ id_aluno, id_disciplina }: ConteudoGetByAlunoDisciplina) {
    
    const conteudos = await prisma.aluno.findMany({
      where: {
        id: id_aluno,  
      },
      select: {
        turma: {
          select: {
            serie: {
              select: {
                SerieHasDisciplina: {
                  select: {
                    disciplina: {
                      select: {         
                        Conteudo: {
                          select: {
                            name: true,
                            id: true,
                            disciplina: {
                              select: {
                                id: true,
                                name: true,
                              }
                            },
                          }
                        }
                      },
                    },
                  }
                }
              }
            }
          }
        },
      }
    });
    
    // Organizando os conteudos que chegaram utilizando só os campos que serão importantes
    const conteudos_final = {
      id: Object(conteudos)[0].id,
      conteudos: Object(conteudos)[0].turma.serie.SerieHasDisciplina
    }
    
    // Array das disciplinas com os dados para organizar
    let disciplinas = []

    // Adicionando as disciplinas no array
    for (let cont of conteudos_final.conteudos) {
      disciplinas.push(cont.disciplina)
    }

    // Array com as informações definitivas
    let array_final = [];

    // Nome da disciplina
    let disciplina_name;

    // Percorrendo o array das disciplinas
    for (let conteudo_array of disciplinas) {

      // Percorrendo o conteúdo de cada disciplina
      for (let conteudo of conteudo_array.Conteudo) {
        
        // Verificando se o id da disciplina inserida pelo usuário é igual ao da disciplina do respectivo conteúdo
        if (id_disciplina == conteudo.disciplina.id) {
          
          // Se for, adiciona o conteudo no array
          array_final.push(conteudo)
          disciplina_name = conteudo.disciplina.name;

          // Remove o campo da disciplina que não será mais necessário
          delete conteudo.disciplina;
        }
      }
    }

    // Objeto final a ser enviado
    const obj_final = {
      disciplina_name,
      conteudo: array_final
    }

    return obj_final
  }

  async findByAluno({ id, id_aluno }: ConteudoFindByAluno) {
    const conteudos = await prisma.conteudo.findUnique(
      {
        where: {
          id
        },
        include: {
          disciplina: true,
          Conteudo_has_itens: {
            select: {
              aula: true,
              atividade: true,
            },
            orderBy: {
              created_at: "asc"
            }
          },
        },
      }
    );

    Object(conteudos).array_conteudos_base = Object(conteudos).Conteudo_has_itens;
    delete Object(conteudos).Conteudo_has_itens;
    
    let array_conteudos = [];

    // Se o array de conteudos não estiver vazio
    if (Object(conteudos).array_conteudos_base.length > 0) {

      for (let item of Object(conteudos).array_conteudos_base) {

        // Removendo o campo da aula caso ela seja nula
        if (item.aula == null) {
          delete item.aula;
          array_conteudos.push(item)
        }
        // Removendo o campo da atividade caso ela seja nula
        else if (item.atividade == null) {
          delete item.atividade;
          array_conteudos.push(item)

          // Verificando se a aula foi favoritada pelo aluno
          if (await prisma.favorito.findFirst({
            where: {
              id_aluno,
              id_aula: item.aula.id
            }
          })) {
            item.aula.favorite = true;
          } else {
            item.aula.favorite = false;
          }

          // Verificando se o aluno já assitiu essa aula e retornando o progresso
          let progresso = await prisma.progresso.findFirst({
            where: {
              id_aluno,
              id_aula: item.aula.id
            },
            select: {
              progress: true
            }
          });

          if (progresso) {
            item.aula.progress = progresso.progress
          } else {
            item.aula.progress = 0
          }

        }
      }
  
      // Organizando o nome do campo
      Object(conteudos).array_conteudos = array_conteudos
      delete Object(conteudos).array_conteudos_base

      // Pegando index do primeiro vídeo
      const index = Object(conteudos).array_conteudos.findIndex((object: any) => {
        return Object.keys(object)[0] === 'aula';
      });

      Object(conteudos).first_aula = {
        id: Object(conteudos).array_conteudos[index].aula.id,
        file: Object(conteudos).array_conteudos[index].aula.file,
        progress: Object(conteudos).array_conteudos[index].aula.progress,
        favorite: Object(conteudos).array_conteudos[index].aula.favorite
      }
    }
    
    // const array_atvs = [];
    // for (let x of Object(conteudos).Conteudo_has_atividade) {
    //   array_atvs.push(Object.values(x)[0])
    // }

    // const array_aulas = [];
    // for (let x of Object(conteudos).Conteudo_has_aula) {
    //   array_aulas.push(Object.values(x)[0])
    // }

    // Object(conteudos).atividade = array_atvs
    // delete Object(conteudos).Conteudo_has_atividade

    // Object(conteudos).Aula = array_aulas
    // delete Object(conteudos).Conteudo_has_aula

    // if (Object(conteudos).Aula) {
      
    //   for (let aula of Object(conteudos).Aula) {
        
    //     // Verificando se a aula foi favoritada pelo aluno
    //     if (await prisma.favorito.findFirst({
    //       where: {
    //         id_aluno,
    //         id_aula: aula.id
    //       }
    //     })) {
    //       aula.favorite = true;
    //     } else {
    //       aula.favorite = false;
    //     }

    //     // Verificando se o aluno já assitiu essa aula e retornando o progresso
    //     let progresso = await prisma.progresso.findFirst({
    //       where: {
    //         id_aluno,
    //         id_aula: aula.id
    //       },
    //       select: {
    //         progress: true
    //       }
    //     });

    //     if (progresso) {
    //       aula.progress = progresso.progress
    //     } else {
    //       aula.progress = 0
    //     }
    //   }
    // }

    return conteudos;
  }

  async find({ id }: ConteudoFind) {
    const conteudo = await prisma.conteudo.findUnique(
      {
        where: {
          id
        },
        include: {
          disciplina: true,
          Conteudo_has_atividade: {
            select: {
              atividade: true
            }
          },
          Conteudo_has_aula: {
            select: {
              aula: true
            }
          }
        }
      }
    );

    const array_atvs = [];
    const array_aulas = [];

    if (Object(conteudo).Conteudo_has_atividade) {
      for (let x of Object(conteudo).Conteudo_has_atividade) {
        array_atvs.push(Object.values(x)[0])
      }
  
      for (let x of Object(conteudo).Conteudo_has_aula) {
        array_aulas.push(Object.values(x)[0])
      }
    }

    Object(conteudo).atividade = array_atvs
    delete Object(conteudo).Conteudo_has_atividade

    Object(conteudo).Aula = array_aulas
    delete Object(conteudo).Conteudo_has_aula

    return conteudo;
  }

  async delete({ id }: ConteudoDelete) {
    await prisma.conteudo.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, name, id_disciplina, id_serie, id_bimestre, status }: ConteudoUpdate) {
    return await prisma.conteudo.update({
      where: {
        id
      },
      data: {
        name,
        id_disciplina,
        id_serie,
        id_bimestre,
        status
      }
    })
  };
}