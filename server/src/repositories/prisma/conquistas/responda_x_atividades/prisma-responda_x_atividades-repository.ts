import { prisma } from "../../../../prisma";
import { Responda_X_AtividadesRepository, Responda_X_AtividadesGetByAluno, Responda_X_AtividadesCheckProgressByAluno } from "../../../interfaces/conquistas/responda_x_atividades/responda_x_atividades-repository";

export class PrismaResponda_X_AtividadesRepository implements Responda_X_AtividadesRepository {

  async get() {
    const conquistas_atividade = await prisma.conquista.findMany({
      where: {
        type: "RESPONDA_X_ATIVIDADE"
      }
    });
    return conquistas_atividade;
  }

  async getByAluno({ id_aluno }: Responda_X_AtividadesGetByAluno) {
    const conquistas_atividade = await prisma.conquista.findMany({
      where: {
        type: "RESPONDA_X_ATIVIDADE"
      }
    });
    return conquistas_atividade;
  }

  async checkProgressByAluno({ conquistas, id_aluno }: Responda_X_AtividadesCheckProgressByAluno) {
    
    const array_final = [];

    for (let conquista of conquistas) {

      // Verifica os dados do aluno com relação a esta conquista
      const aluno_conquista = await prisma.aluno_has_conquista.findFirst({
        where: {
          id_aluno,
          id_conquista: conquista.id_conquista
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

      console.log(progress)

      if(progress === 100) {
        
        console.log("progresso foi")

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

    return array_final;
  }

}