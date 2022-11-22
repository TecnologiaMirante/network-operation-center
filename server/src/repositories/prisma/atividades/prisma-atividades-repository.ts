import { prisma } from "../../../prisma";
import { AtividadeCreateData, AtividadesRepository, AtividadeFind, AtividadeDelete, AtividadeUpdate, AtividadeGetQuestoes, AtividadeFindEssentialData, AtividadeGetByDisciplinas } from "../../interfaces/atividades/atividades-repository";

export class PrismaAtividadesRepository implements AtividadesRepository {

  // Por enquanto, não iremos enviar a nota da atividade
  async create( { title, thumb, id_disciplina, id_serie }: AtividadeCreateData ) {
    return await prisma.atividade.create({
      data: {
        title,
        thumb,
        id_disciplina,
        id_serie
      }
    })
  };

  async get() {
    const atividades = await prisma.atividade.findMany({
      orderBy: {
        title: "asc"
      }
    });
    return atividades;
  }

  async find({ id }: AtividadeFind) {
    const atividade = await prisma.atividade.findUnique(
      {
        where: {
          id
        },
        select: {
          title: true,
          Atividade_has_questao: {
            select: {
              questao: {
                select: {
                  id: true,
                  title: true,
                  grade: true,
                  difficulty: true,
                  opcao: {
                    select: {
                      description: true,
                      is_correct: true,
                    },
                  }
                }
              }
            }
          }
        }
      }
    );

    let questoes = [];

    // Percorrendo as questões
    for (let questao of Object(atividade).Atividade_has_questao) {

      questoes.push(Object.values(questao)[0])
    }

    
    // Percorrendo o array das questões para verificar qual resposta é a correta
    for (let questao of questoes) {
      // Criando um array para colocar a descrição de cada opção em um array
      let array_ops_desc = [];

      // Array das opções
      const array_ops = Object(questao).opcao;

      // Index da resposta correta
      let index = array_ops.findIndex((e: Object) => Object(e).is_correct == true);

      // Colocando o index da resposta correta no respectivo campo
      Object(questao).answer_index = index;

      // Percorrendo as opções da questão
      for (let op of array_ops) {
        // Adicionando a descrição da opção no array
        array_ops_desc.push(op.description)
      }

      // Apagando o campo antigo das opções
      delete Object(questao).opcao;

      // Adicionando o campo organizado das opções
      Object(questao).opcoes = array_ops_desc
    }
    

    // Criando nova key questoes e apagando a antiga
    Object(atividade).questoes = questoes;
    delete Object(atividade).Atividade_has_questao;

    return atividade;
  }

  async getQuestoes({ id }: AtividadeGetQuestoes) {
    const questoes = await prisma.atividade_has_questao.findMany({
      where: {
        id_atividade: id
      },
      select: {
        questao: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            grade: true,
            opcao: {
              select: {
                description: true,
                is_correct: true
              },
            }
          }
        }
      }
    });

    // Criando um array para colocar a descrição de cada opção em um array
    
    let questoes_final = [];
    
    // Percorrendo o array das questões para verificar qual resposta é a correta
    for (let questao_ of Object(questoes)) {
      
      let array_ops_desc = [];

      const questao = Object.values(questao_)[0];

      // Array das opções
      const array_ops = Object(questao).opcao;

      // Index da resposta correta
      let index = array_ops.findIndex((e: Object) => Object(e).is_correct == true);

      // Colocando a resposta correta no respectivo campo
      Object(questao).correct_option = array_ops[index].description;
      
      // // Colocando o index da resposta correta no respectivo campo
      // Object(questao).answer_index = index;

      // Percorrendo as opções da questão
      for (let op of array_ops) {
        // Adicionando a descrição da opção no array
        array_ops_desc.push(op.description)
      }

      // Apagando o campo antigo das opções
      delete Object(questao).opcao;

      // Adicionando o campo organizado das opções
      Object(questao).opcoes = array_ops_desc

      questoes_final.push(questao)
    }
    
    return questoes_final;
  }

  async getByDisciplina({ id_disciplina }: AtividadeGetByDisciplinas) {
    const atividades_base = await prisma.atividade.findMany({
      where: {
        Atividade_has_questao: {
          every: {
            questao: {
              id_disciplina
            }
          }
        }
      },
    })

    return atividades_base;
  }

  async findEssentialData({ id }: AtividadeFindEssentialData) {
    return await prisma.atividade.findFirst({
      where: {
        id,
      },
      select: {
        title: true,
        grade: true,
      }
    })
  }

  async delete({ id }: AtividadeDelete) {
    await prisma.atividade.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, title, thumb, id_disciplina, id_serie }: AtividadeUpdate) {
    await prisma.atividade.update({
      where: {
        id
      },
      data: {
        title,
        thumb,
        id_disciplina,
        id_serie
      }
    })
  };
}