import { prisma } from "../../../prisma";
import { ConquistaCreateData, ConquistasRepository, ConquistaFind, ConquistaDelete, ConquistaUpdate } from "../../interfaces/conquistas/conquistas-repository";

export class PrismaConquistasRepository implements ConquistasRepository {

  async create( { name, description, type, objective, objective_secondary, discipline, difficulty }: ConquistaCreateData ) {
    
    return await prisma.conquista.create({
      data: {
        name, 
        description,
        type, 
        objective, 
        objective_secondary, 
        discipline, 
        difficulty
      }
    })
  };

  async get() {
    const questoes = await prisma.conquista.findMany();
    return questoes;
  }

  async find({ id }: ConquistaFind) {
    const questao = await prisma.conquista.findUnique(
      {
        where: {
          id
        },
      }
    );
    return questao;
  }

  async delete({ id }: ConquistaDelete) {
    await prisma.conquista.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, name, description, type, objective, objective_secondary, discipline, difficulty }: ConquistaUpdate) {
    await prisma.conquista.update({
      where: {
        id
      },
      data: {
        name, 
        description,
        type, 
        objective, 
        objective_secondary, 
        discipline, 
        difficulty
      }
    })
  };
}