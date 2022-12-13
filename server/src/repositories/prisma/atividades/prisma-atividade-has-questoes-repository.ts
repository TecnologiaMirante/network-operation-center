import { prisma } from "../../../prisma";
import { AtividadeHasQuestoesCreateData, AtividadeHasQuestoesRepository, AtividadeHasQuestoesFind, AtividadeHasQuestoesDelete, AtividadeHasQuestoesUpdate, AtividadeFindQuestoesByAtividade, AtividadeUpdateQuestoesGrade, AtividadeHasQuestoesDeleteManyByAtividade, AtividadeHasQuestoesDeleteQuestao, AtividadeHasQuestoesFindByQuestao } from "../../interfaces/atividades/atividade-has-questoes-repository";

export class PrismaAtividadeHasQuestoesRepository implements AtividadeHasQuestoesRepository {

  async create( { id_questao, id_atividade }: AtividadeHasQuestoesCreateData ) {
    return await prisma.atividade_has_questao.create({
      data: {
        id_questao,
        id_atividade
      }
    })
  };

  async get() {
    const atividadeHasQuestoes = await prisma.atividade_has_questao.findMany();
    return atividadeHasQuestoes;
  }

  async find({ id }: AtividadeHasQuestoesFind) {
    const atividadeHasQuestao = await prisma.atividade_has_questao.findUnique(
      {
        where: {
          id
        },
      }
    );
    return atividadeHasQuestao;
  }
  
  async findByQuestao({ id_atividade, id_questao }: AtividadeHasQuestoesFindByQuestao) {
    const atividadeHasQuestao = await prisma.atividade_has_questao.findFirst(
      {
        where: {
          id_atividade,
          id_questao
        },
      }
    );
    return atividadeHasQuestao;
  }

  async findQuestoesByAtividade({ id_atividade }: AtividadeFindQuestoesByAtividade) {
    return await prisma.atividade_has_questao.findMany({
      where: {
        id_atividade
      },
      include: {
        atividade: {
          select: {
            grade: true
          }
        },
        questao: {
          select: {
            grade: true
          }
        }
      }
    })
  }

  async updateQuestoesGrade({ id_atividade }: AtividadeUpdateQuestoesGrade) {
    const questoes = await prisma.atividade_has_questao.findMany({
      where: {
        id_atividade
      },
      include: {
        atividade: {
          select: {
            grade: true
          }
        },
        questao: {
          select: {
            grade: true
          }
        }
      }
    })

    // Quanto vale a atividade
    const valor_atividade = Object(questoes)[0].atividade.grade;
    
    // Quantidade de questões
    const qtd_questoes = Object(questoes).length;
    
    // Cálculo do valor de cada questão
    // Utilizaremos o valor correspondente a quando vale a atividade em razão da quantidade de questões
    let valor_questao = valor_atividade / qtd_questoes

    // Iremos atualizar o valor da questão com este valor obtido
    for (let questao of Object(questoes)) {
      await prisma.questao.update({
        where: {
          id: questao.id_questao,
        },
        data: {
          grade: valor_questao 
        }
      })
    }

  }

  async delete({ id }: AtividadeHasQuestoesDelete) {
    await prisma.atividade_has_questao.delete({
      where: {
        id,
      }
    });
  }

  async deleteQuestao({ id, id_questao }: AtividadeHasQuestoesDeleteQuestao) {

    const rel = await prisma.atividade_has_questao.findFirst({
      where: {
        id,
        id_questao
      }
    })

    await prisma.atividade_has_questao.delete({
      where: {
        id: Object(rel).id,
      }
    });
  }

  async deleteManyByAtividade({ id_atividade }: AtividadeHasQuestoesDeleteManyByAtividade) {
    await prisma.atividade_has_questao.deleteMany({
      where: {
        id_atividade,
      }
    });
  }

  async update({ id, id_questao, id_atividade }: AtividadeHasQuestoesUpdate) {
    await prisma.atividade_has_questao.update({
      where: {
        id
      },
      data: {
        id_questao,
        id_atividade
      }
    })
  };
}