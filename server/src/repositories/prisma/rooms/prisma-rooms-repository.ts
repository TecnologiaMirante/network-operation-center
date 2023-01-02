import { prisma } from "../../../prisma";
import { RoomCreateData, RoomsRepository, RoomFind, RoomDelete, RoomUpdate, RoomFindByName } from "../../interfaces/rooms/rooms-repository";

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