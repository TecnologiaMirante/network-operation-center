import { prisma } from "../../../prisma";
import { SecreatariaUserfindUserWithExistentMat, SecretariaUserCreateData, SecretariaUserDelete, SecretariaUserFind, SecretariaUserfindUserWithExistentEmail, SecretariaUserLoginData, SecretariaUsersRepository, SecretariaUserUpdate, SendToken, UpdatePassword} from "../../interfaces/secretarias/secretaria-users-repository";

export class PrismaSecretariaUsersRepository implements SecretariaUsersRepository {
  
  async create({ name, email, password, mat, id_secretaria }: SecretariaUserCreateData) {
    await prisma.secretariaUser.create({
      data: {
        name,
        email,
        password,
        mat,
        id_secretaria,
      }
    })
  };

  async findLoginData({ id }: SecretariaUserLoginData) {
    const secretariaUser = await prisma.secretariaUser.findUnique(
      {
        where: {
          id
        },
        select: {
          mat: true,
          secretaria: {
            select: {
              name: true
            }
          },
        }
      }
    );
    return secretariaUser;
  }

  async get() {
    const secretariaUsers = await prisma.secretariaUser.findMany();
    return secretariaUsers;
  };

  async find({ id }: SecretariaUserFind ) {
    const secretariaUser = await prisma.secretariaUser.findUnique(
      {
        where: {
          id,
        },
        include: {
          secretaria: true
        }
      }
    );
    return secretariaUser;
  };

  async findUserWithExistentEmail({ email }: SecretariaUserfindUserWithExistentEmail){
    const secretariaUser = await prisma.secretariaUser.findFirst(
      {
        where: {
          email,
        }
      }
    );
    return secretariaUser;
  }

  async findUserWithExistentMat({ mat }: SecreatariaUserfindUserWithExistentMat){
    const escolaUser = await prisma.secretariaUser.findFirst(
      {
        where: {
          mat,
        }
      }
    );
    return escolaUser;
  }


  async sendToken({ id, token, expiresIn}: SendToken) {
    await prisma.secretariaUser.update(
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
    await prisma.secretariaUser.update(
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

  async delete({ id }: SecretariaUserDelete){
    await prisma.secretariaUser.delete({
      where: {
        id,
      }
    });
  };

  async update({ id, name, email, id_secretaria }: SecretariaUserUpdate){
    await prisma.secretariaUser.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        id_secretaria,
      }
    })
  };

}