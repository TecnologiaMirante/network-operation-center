import { prisma } from "../../../prisma";
import { QuestaoCreateData, QuestoesRepository, QuestaoFind, QuestaoDelete, QuestaoUpdate, QuestaoDeleteManyByAtividade, QuestaoDeleteMany } from "../../interfaces/questoes/questoes-repository";

export class PrismaQuestoesRepository implements QuestoesRepository {

  async create( { title, question_type, grade, difficulty, id_disciplina }: QuestaoCreateData ) {
    return await prisma.questao.create({
      data: {
        title,
        question_type,
        grade, 
        difficulty, 
        id_disciplina
      }
    })
  };

  async get() {
    const questoes = await prisma.questao.findMany();
    return questoes;
  }

  async find({ id }: QuestaoFind) {
    const questao = await prisma.questao.findUnique(
      {
        where: {
          id
        },
        include: {
          opcao: true
        }
      }
    );
    return questao;
  }

  async delete({ id }: QuestaoDelete) {
    await prisma.questao.delete({
      where: {
        id,
      }
    });
  }

  async deleteMany({ data }: QuestaoDeleteMany) {

    await prisma.atividade_has_questao.deleteMany({})
  }

  async deleteManyByAtividade({ id_atividade }: QuestaoDeleteManyByAtividade) {
    await prisma.questao.deleteMany({
      where: {
        Atividade_has_questao: {
          
        }
      }
    })
  };

  async update({ id, title, question_type, grade, difficulty, id_disciplina }: QuestaoUpdate) {
    return await prisma.questao.update({
      where: {
        id
      },
      data: {
        title,
        question_type,
        grade, 
        difficulty, 
        id_disciplina
      }
    })
  };
}