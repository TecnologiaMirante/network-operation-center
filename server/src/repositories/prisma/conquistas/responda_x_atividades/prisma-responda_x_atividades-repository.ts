import { prisma } from "../../../../prisma";
import { Responda_X_AtividadesRepository, Responda_X_AtividadesGetByAluno, Responda_X_AtividadesCheckUnlockedByAluno, Responda_X_AtividadesGet, Responda_X_AtividadesUpdateProgress } from "../../../interfaces/conquistas/responda_x_atividades/responda_x_atividades-repository";

export class PrismaResponda_X_AtividadesRepository implements Responda_X_AtividadesRepository {

  async get({ id_disciplina }: Responda_X_AtividadesGet) {

    const array_conquistas = [];

    const conquistas_gerais = await prisma.conquista.findMany({
      where: {
        type: "RESPONDA_X_ATIVIDADE",
        domain: "general"
      }
    });

    array_conquistas.push(...conquistas_gerais);

    const conquistas_especificas = await prisma.conquista.findMany({
      where: {
        type: "RESPONDA_X_ATIVIDADE",
        domain: "specific",
        id_disciplina
      }
    });

    array_conquistas.push(...conquistas_especificas);

    return array_conquistas;
  }

  async getByAluno({ id_aluno }: Responda_X_AtividadesGetByAluno) {
    const conquistas_atividade = await prisma.conquista.findMany({
      where: {
        type: "RESPONDA_X_ATIVIDADE"
      }
    });
    return conquistas_atividade;
  }

  async checkUnlockedByAluno({ conquistas, id_aluno }: Responda_X_AtividadesCheckUnlockedByAluno) {
    
    const array_final = [];

    for (let conquista of conquistas) {

      // Verifica os dados do aluno com relação a esta conquista
      const aluno_conquista = await prisma.aluno_has_conquista.findFirst({
        where: {
          id_aluno,
          id_conquista: conquista.id
        }
      });

      // const current = Object(aluno_conquista).current + 1;
      // const progress = (current/conquista.objective) * 100;

      // await prisma.aluno_has_conquista.update({
      //   where: {
      //     id: Object(aluno_conquista).id,
      //   },
      //   data: {
      //     current: current,
      //     progress: progress
      //   }
      // })

      // console.log(progress)

      if(Object(aluno_conquista).progress === 100) {
        
        // Se a conquista ainda não tiver sido desbloqueada anteriormente
        if (Object(aluno_conquista).unlocked == false) {

          // Atualiza o unlocked como true,
          // Ou seja, agora está desbloqueada
          await prisma.aluno_has_conquista.update({
            where: {
              id: Object(aluno_conquista).id,
            },
            data: {
              unlocked: true
            }
          });

          // Adiciona no array de conquistas recém desbloqueadas
          array_final.push({
            conquista: {
              name: conquista.name,
              description: conquista.description,
              objective: conquista.objective
            }, 
            status: true
          })
        }
      }
    }

    return array_final;
  }

  async updateProgressByAluno({ conquistas, id_aluno }: Responda_X_AtividadesUpdateProgress) {
    
    for (let conquista of conquistas) {

      // Verifica os dados do aluno com relação a esta conquista
      const aluno_conquista = await prisma.aluno_has_conquista.findFirst({
        where: {
          id_aluno,
          id_conquista: conquista.id
        }
      });

      const current = Object(aluno_conquista).current + 1;
      const progress = (current/conquista.objective) * 100;

      await prisma.aluno_has_conquista.update({
        where: {
          id: Object(aluno_conquista).id,
        },
        data: {
          current: current,
          progress: progress
        }
      })
    }
  }

}