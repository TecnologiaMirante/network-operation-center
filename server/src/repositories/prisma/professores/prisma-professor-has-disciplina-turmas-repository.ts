import { prisma } from "../../../prisma";
import { ProfessorHasDisciplinaTurmaCreateData, ProfessorHasDisciplinaTurmasRepository, ProfessorHasDisciplinaTurmaFind, ProfessorHasDisciplinaTurmaDelete, ProfessorHasDisciplinaTurmaUpdate, ProfessorHasDisciplinaTurmaGetSeriesByProfessor } from "../../interfaces/professores/professor-has-disciplina-turmas-repository";

export class PrismaProfessorHasDisciplinaTurmasRepository implements ProfessorHasDisciplinaTurmasRepository {

  async create( { id_professor_has_disciplinas, id_turma }: ProfessorHasDisciplinaTurmaCreateData ) {
    return await prisma.professorHasDisciplinaTurma.create({
      data: {
        id_professor_has_disciplinas,
        id_turma
      }
    })
  };

  async get() {
    const professores = await prisma.professorHasDisciplinaTurma.findMany({
      select: {
        professor_has_disciplinas: {
          select: {
            professor: {
              select: {
                id: true,
                escola_user: {
                  select: {
                    name: true
                  }
                }
              }
            },
            disciplina: {
              select: {
                name: true
              }
            }
          }
        },
        turma: {
          select: {
            name: true            
          }
        },        
      }
    });
    return professores;
  }

  async getSeriesByProfessor({ id_professor }: ProfessorHasDisciplinaTurmaGetSeriesByProfessor) {

    // Buscando os dados
    const dados = await prisma.professorHasDisciplinaTurma.findMany({
      where: {
        professor_has_disciplinas: {
          id_professor: id_professor,
        }
      },
      select: {
        professor_has_disciplinas: {
          select: {
            id_professor: true,
            disciplina: {
              select: {
                name: true,
                id: true,
                bk_color:true,
                bk_img:true,
                icon: true
              }
            }
          }
        },
        turma: {
          select: {
            serie: {
              select: {
                name: true,
                id: true
              }
            }
          },
        },
      },
      orderBy: {
        turma: {
          serie: {
            name: "asc"
          }
        }
      }
    });

    // Agrupando por série
    const result = dados.reduce(function (r, a) {
      r[Object(a).turma.serie.name] = r[Object(a).turma.serie.name] || [];
      r[Object(a).turma.serie.name].push(a);
      return r;
    }, Object.create(null));    

    // Array final
    let array_final = [];

    // Colocando os dados no array
    for (let item in result) {
      const disciplinas = result[item]
      array_final.push({
        serie: {
          name: item,
          id: result[item][0].turma.serie.id
        },
        disciplinas,
      });
    }
    
    // Organizando a saida dos dados
    for (let itens of array_final) {
      
      // array de disciplinas
      const array_disciplinas = [];

      // Percorrendo o array de disciplinas
      for (let disciplina of itens.disciplinas) {
        disciplina.professor_has_disciplinas.disciplina.id_serie = itens.serie.id;
        array_disciplinas.push(disciplina.professor_has_disciplinas.disciplina)
      }

      // Removendo o campo antigo (desorganizado)
      delete itens.disciplinas;

      // Colocando o campo novo (organizado)
      itens.disciplinas = array_disciplinas

    }

    return array_final
  }

  async find({ id }: ProfessorHasDisciplinaTurmaFind) {
    const Professor = await prisma.professorHasDisciplinaTurma.findUnique(
      {
        where: {
          id
        },
        include: {
          professor_has_disciplinas: {
            select: {
              professor: {
                select: {
                  escola_user: {
                    select: {
                      name: true
                    }
                  }
                }
              },
              disciplina: {
                select: {
                  name: true
                }
              }
            }
          },
          turma: {
            select: {
              serie: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    );
    return Professor;
  }

  async delete({ id }: ProfessorHasDisciplinaTurmaDelete) {
    await prisma.professorHasDisciplinaTurma.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, id_professor_has_disciplinas, id_turma }: ProfessorHasDisciplinaTurmaUpdate) {
    await prisma.professorHasDisciplinaTurma.update({
      where: {
        id
      },
      data: {
        id_professor_has_disciplinas,
        id_turma
      }
    })
  };
}