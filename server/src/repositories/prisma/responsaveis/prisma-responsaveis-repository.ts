import { prisma } from "../../../prisma";
import { ResponsavelCreateData, ResponsaveisRepository, ResponsavelFind, ResponsavelDelete, ResponsavelUpdate, ResponsavelfindUserWithExistentEmail, ResponsavelfindUserWithExistentCPF, UpdatePassword, SendToken, ResponsavelfindUserWithExistentName } from "../../interfaces/responsaveis/responsaveis-repository";

export class PrismaResponsaveisRepository implements ResponsaveisRepository {

  async create( { name, email, password, cpf, phone }: ResponsavelCreateData ) {
    return await prisma.responsavel.create({
      data: {
        name, 
        email,
        password,
        cpf,
        phone
      }
    })
  };

  async get() {
    const responsaveis = await prisma.responsavel.findMany();
    return responsaveis;
  }

  async find({ id }: ResponsavelFind) {
    const responsavel = await prisma.responsavel.findUnique(
      {
        where: {
          id
        },
      }
    );
    return responsavel;
  }

  async findUserWithExistentName({ name }: ResponsavelfindUserWithExistentName){
    const responsavel = await prisma.responsavel.findFirst(
      {
        where: {
          name,
        }
      }
    );
    return responsavel;
  }

  async findUserWithExistentEmail({ email }: ResponsavelfindUserWithExistentEmail){
    const responsavel = await prisma.responsavel.findFirst(
      {
        where: {
          email,
        }
      }
    );
    return responsavel;
  }

  async findUserWithExistentCPF({ cpf }: ResponsavelfindUserWithExistentCPF){
    const responsavel = await prisma.responsavel.findFirst(
      {
        where: {
          cpf,
        }
      }
    );
    return responsavel;
  }

  async delete({ id }: ResponsavelDelete) {
    await prisma.responsavel.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, name, email, cpf, phone }: ResponsavelUpdate) {
    await prisma.responsavel.update({
      where: {
        id
      },
      data: {
        name,
        email, 
        cpf, 
        phone
      }
    })
  };

  async sendToken({ id, token, expiresIn}: SendToken) {
    await prisma.responsavel.update(
      {
        where: {
          id
        },
        data: {
          passwordResetToken: token,
          passwordResetExpires: expiresIn
        }
      }
    );
  }

  async updatePassword({ id, password }: UpdatePassword) {
    await prisma.responsavel.update(
      {
        where: {
          id
        },
        data: {
          password,
        }
      }
    )
  }
}