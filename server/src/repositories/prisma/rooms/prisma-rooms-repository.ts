import { prisma } from "../../../prisma";
import { RoomCreateData, RoomsRepository, RoomFind, RoomDelete, RoomUpdate, RoomFindByName, RoomGetOpenRooms } from "../../interfaces/rooms/rooms-repository";

export class PrismaRoomsRepository implements RoomsRepository {

    async create( { id_aluno, id_professor, id_name }: RoomCreateData ) {
      return await prisma.room.create({
        data: {
            id_aluno, 
            id_professor,
            id_name,
        }
      })
    };
  
    async get() {
      const rooms = await prisma.room.findMany({});
      return rooms;
    }
  
    async find({ id }: RoomFind) {
      const room = await prisma.room.findUnique(
        {
          where: {
            id
          },
        }
      );
      return room;
    }

    async findByName({ id_name }: RoomFindByName) {

        const room = await prisma.room.findFirst({
            where: {
                id_name
            },
        });
        return room;
    }
  
    async delete({ id }: RoomDelete) {
      await prisma.room.delete({
        where: {
          id,
        }
      });
    }
  
    async update({ id, id_aluno, id_professor }: RoomUpdate) {
      return await prisma.room.update({
        where: {
          id
        },
        data: {
          id_aluno, id_professor
        }
      })
    };

    async getOpenRooms({ id_professor }: RoomGetOpenRooms) {
      
      const rooms = await prisma.room.findMany({
        where: {
          id_professor
        }
      });

      // Para cada sala
      for (let room of rooms) {

        // Pegando os dados do aluno
        const aluno_name = await prisma.aluno.findFirst({
          where: {
            id: room.id_aluno
          },
          select: {
            escola_user: {
              select: {
                name: true,
                avatar: true
              }
            }
          }
        });

        // Adicionando os dados do aluno no objeto
        Object(room).aluno_name = Object(aluno_name).escola_user.name;
        Object(room).aluno_avatar = Object(aluno_name).escola_user.avatar;
        
        // Pegando as mensagens da sala
        const msgs_sala = await prisma.message.findMany({
          where: {
            id_room: room.id
          },
          orderBy: {
            created_at: "asc"
          }
        });

        // Verificando se a sala não está vazia
        if(msgs_sala.length > 0) {
          Object(room).msg = msgs_sala[msgs_sala.length - 1];
        } else {
          Object(room).msg = "Nova mensagem";
        }

      }



      return rooms;
    }

    // async updateSocketRoom({ id, id_socket }: RoomUpdateSocketRoom) {
    //   return await prisma.room.update({
    //     where: {
    //       id
    //     },
    //     data: {
    //       id_socket
    //     }
    //   })
    // };

    // async addUser({ id, id_connected }: RoomAddUser) {
    //   return await prisma.room.update({
    //     where: {
    //       id,
    //     },
    //     data: {
    //       id_connected
    //     }
    //   })
    // }

    // async userIsInRoom({ id, id_connected }: RoomUserIsInRoom) {
    //   const users = await prisma.room.findFirst({
    //     where: {
    //       id,
    //       id_connected
    //     }
    //   });

    //   return users;
    // }
  }