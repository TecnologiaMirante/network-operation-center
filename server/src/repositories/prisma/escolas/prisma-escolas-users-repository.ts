import { prisma } from "../../../prisma";
import { EscolaUserCreateData, EscolaUsersRepository, EscolaUserFind, EscolaUserDelete, EscolaUserUpdate, EscolaUserfindUserWithExistentEmail, EscolaUserfindUserWithExistentCPF, EscolaUserfindUserWithExistentMat, UpdatePassword, SendToken, EscolaUserfindUserWithExistentName, EscolaUserAuthenticate, EscolaUserIsAuthenticated, EscolaUserChangePassword, AlunoEscolaUserLoginData, ProfessorEscolaUserLoginData } from "../../interfaces/escolas/escolas-users-repository";

export class PrismaEscolaUsersRepository implements EscolaUsersRepository {

  async create( { name, email, password, cpf, mat, born, genre, avatar, id_responsavel, id_escola }: EscolaUserCreateData ) {
    return await prisma.escolaUser.create({
      data: {
        name, 
        email,
        password,
        cpf,
        mat,
        born,
        genre,
        avatar,
        id_responsavel,
        id_escola
      }
    })
  };

  async get() {
    const escolaUsers = await prisma.escolaUser.findMany();
    return escolaUsers;
  }

  async find({ id }: EscolaUserFind) {
    const escolaUser = await prisma.escolaUser.findUnique(
      {
        where: {
          id
        },
        include: {
          escola: true,
          EscolaUser_has_type: {
            include: {
              escola_user_type: {
                include: {
                  Type_has_permissao: {
                    include: {
                      permissao: true
                    }
                  }
                }
              },
            }
          },
          Aluno: {
            include: {
              turma: true,
            }
          },
          responsavel: true,
          Professor: true,
          User_has_address: true,
          User_has_phone: true,
          Type_has_permissao_custom: true,
        }
      }
    );
    return escolaUser;
  }

  async findAlunoLoginData({ id }: AlunoEscolaUserLoginData) {
    const escolaUser = await prisma.escolaUser.findUnique(
      {
        where: {
          id
        },
        select: {
          id: true,
          name: true,
          Aluno: {
            select: {
              id: true
            }
          }
        }
      }
    );

    // Arrumar futuramente para caso seja professor, aluno ou outro cargo
    const escolaUser_final = {
      id: escolaUser?.Aluno[0].id,
      id_senha: id,
      name: escolaUser?.name
    }

    return escolaUser_final;
  }

  async findProfessorLoginData({ id }: ProfessorEscolaUserLoginData) {
    const escolaUser = await prisma.escolaUser.findUnique(
      {
        where: {
          id
        },
        select: {
          id: true,
          Professor: {
            select: {
              id: true
            }
          }
        }
      }
    );

    // Arrumar futuramente para caso seja professor, aluno ou outro cargo
    const escolaUser_final = {
      id: escolaUser?.Professor[0].id,
      id_senha: id
    }

    return escolaUser_final;
  }


  async changePassword({ id_user, new_password }: EscolaUserChangePassword) {
    await prisma.escolaUser.update({
      where: {
        id: id_user
      },
      data: {
        password: new_password
      }
    })
  }

  async authenticate({ id, status }: EscolaUserAuthenticate) {
    await prisma.escolaUser.update({
      where: {
        id
      },
      data: {
        isAuthenticated: status,
      }

    })
  }

  async isAuthenticated({ id }: EscolaUserIsAuthenticated) {
    const userIsAuthenticated = await prisma.escolaUser.findUnique({
      where: {
        id,
      },
      select: {
        isAuthenticated: true
      }
    })

    return userIsAuthenticated;
  }

  async findUserWithExistentName({ name }: EscolaUserfindUserWithExistentName){
    const escolaUser = await prisma.escolaUser.findFirst(
      {
        where: {
          name,
        }
      }
    );
    return escolaUser;
  }

  async findUserWithExistentEmail({ email }: EscolaUserfindUserWithExistentEmail){
    const escolaUser = await prisma.escolaUser.findFirst(
      {
        where: {
          email,
        }
      }
    );
    return escolaUser;
  }

  async findUserWithExistentCPF({ cpf }: EscolaUserfindUserWithExistentCPF){
    const escolaUser = await prisma.escolaUser.findFirst(
      {
        where: {
          cpf,
        }
      }
    );
    return escolaUser;
  }

  async findUserWithExistentMat({ mat }: EscolaUserfindUserWithExistentMat){
    const escolaUser = await prisma.escolaUser.findFirst(
      {
        where: {
          mat,
        }
      }
    );
    return escolaUser;
  }

  async delete({ id }: EscolaUserDelete) {
    await prisma.escolaUser.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, name, email, cpf, mat, born, genre, avatar, id_responsavel, id_escola }: EscolaUserUpdate) {
    await prisma.escolaUser.update({
      where: {
        id
      },
      data: {
        name,
        email, 
        cpf, 
        mat, 
        born, 
        genre, 
        avatar, 
        id_responsavel,
        id_escola
      }
    })
  };

  async sendToken({ id, token, expiresIn}: SendToken) {
    await prisma.escolaUser.update(
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
    await prisma.escolaUser.update(
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