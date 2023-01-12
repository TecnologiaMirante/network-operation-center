import { prisma } from "../../../prisma";
import { ConquistaCreateData, ConquistasRepository, ConquistaFind, ConquistaDelete, ConquistaUpdate, ConquistaCreateSpecific, ConquistaCreateGeneral } from "../../interfaces/conquistas/conquistas-repository";

export class PrismaConquistasRepository implements ConquistasRepository {

  async create( { name, description, color, icon, type, domain, objective, objective_secondary, id_disciplina, difficulty }: ConquistaCreateData ) {
    
    return await prisma.conquista.create({
      data: {
        name, 
        description,
        color,
        icon,
        type, 
        domain,
        objective, 
        objective_secondary, 
        id_disciplina, 
        difficulty
      }
    })
  };

  async createSpecific( { name, description, color, icon, type, domain, objective, objective_secondary, id_disciplina, difficulty }: ConquistaCreateSpecific ) {
    
    return await prisma.conquista.create({
      data: {
        name, 
        description,
        color,
        icon,
        type, 
        domain,
        objective, 
        objective_secondary, 
        id_disciplina, 
        difficulty
      }
    })
  };

  async createGeneral( { name, description, color, icon, type, domain, objective, objective_secondary, id_disciplina, difficulty }: ConquistaCreateGeneral ) {
    
    return await prisma.conquista.create({
      data: {
        name, 
        description,
        color,
        icon,
        type, 
        domain,
        objective, 
        objective_secondary, 
        id_disciplina, 
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

  async update({ id, name, description, color, icon, type, domain, objective, objective_secondary, id_disciplina, difficulty }: ConquistaUpdate) {
    return await prisma.conquista.update({
      where: {
        id
      },
      data: {
        name, 
        description,
        type, 
        color, 
        icon,
        domain,
        objective, 
        objective_secondary, 
        id_disciplina, 
        difficulty
      }
    })
  };
}