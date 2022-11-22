import { prisma } from "../../../prisma";
import { AnotacaoCreateData, AnotacoesRepository, AnotacaoFind, AnotacaoDelete, AnotacaoUpdate, AnotacaoGetByAluno } from "../../interfaces/anotacoes/anotacoes-repository";

export class PrismaAnotacoesRepository implements AnotacoesRepository {

  async create( { descricao, id_aluno, id_aula }: AnotacaoCreateData ) {
    return await prisma.anotacao.create({
      data: {
        descricao,
        id_aluno,
        id_aula
      }
    })
  };

  async get() {
    const anotacoes = await prisma.anotacao.findMany();
    return anotacoes;
  }

  async getByAluno({ id_aluno }: AnotacaoGetByAluno) {
    const anotacoes = await prisma.anotacao.findMany({
      where: {
        id_aluno,
      },
      select: {
        id: true,
        id_aula: true,
        descricao: true,
        Anotacao_has_tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        updated_at: "asc"
      }
    })

    
    // Percorrendo cada anotação
    for (let anotacao of anotacoes) {
      
      let array_tags = [];
      
      // Object(anotacao).tags = Object(anotacao).Anotacao_has_tags;
      // delete Object(anotacao).Anotacao_has_tags;

      // Agora, em cada anotação, percorrendo as tags
      for (let tag of Object(anotacao).Anotacao_has_tags) {
        array_tags.push(Object.values(tag)[0])
      }

      Object(anotacao).tags = array_tags;
      delete Object(anotacao).Anotacao_has_tags;


    }

    return anotacoes;
  }

  async find({ id }: AnotacaoFind) {
    const anotacao = await prisma.anotacao.findUnique(
      {
        where: {
          id
        },
        include: {
          aluno: true,
          aula: true,
          Anotacao_has_tags: {
            select: {
              tag: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    );

    const array_tags = [];

    // Percorrendo as anotações
    for (let tag of Object(anotacao).Anotacao_has_tags) {
      
      // Adicionando o nome da tag no array
      array_tags.push(Object(Object.values(tag)[0]).name)
    }

    delete Object(anotacao).Anotacao_has_tags;
    Object(anotacao).tags = array_tags

    return anotacao;
  }


  async delete({ id }: AnotacaoDelete) {
    await prisma.anotacao.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, descricao, id_aluno, id_aula }: AnotacaoUpdate) {
    return await prisma.anotacao.update({
      where: {
        id
      },
      data: {
        descricao,
        id_aluno,
        id_aula
      }
    })
  };
}