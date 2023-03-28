import { prisma } from "../../../../prisma";
import { UserRoomCreateData, UserRoomsRepository, UserRoomFind, UserRoomDelete, UserRoomUpdate, UserRoomUpdateSocketUserRoom, UserRoomAddUser, UserRoomUserIsInUserRoom } from "../../../interfaces/rooms/user-rooms/user-rooms-repository";

export class PrismaUserRoomsRepository implements UserRoomsRepository {

    async create( { id_room, id_socket, id_connected }: UserRoomCreateData ) {

      const room = await prisma.userRoom.create({
        data: {
          id_room,
          id_socket, 
          id_connected
        }
      })
      
      return id_room;

    };
  
    async get() {
      const rooms = await prisma.userRoom.findMany({});
      return rooms;
    }
  
    async find({ id }: UserRoomFind) {
      const room = await prisma.userRoom.findUnique(
        {
          where: {
            id
          },
        }
      );
      return room;
    }

    async delete({ id }: UserRoomDelete) {
      await prisma.userRoom.delete({
        where: {
          id,
        }
      });
    }
  
    async update({ id, id_connected, id_room, id_socket }: UserRoomUpdate) {
      return await prisma.userRoom.update({
        where: {
          id
        },
        data: {
          id_connected, id_room, id_socket
        }
      })
    };

    async updateSocketUserRoom({ id_room, id_connected, id_socket }: UserRoomUpdateSocketUserRoom) {

      const userRoom = await prisma.userRoom.findFirst({
        where: {
          id_room,
          id_connected
        }
      })

      return await prisma.userRoom.update({
        where: {
          id: Object(userRoom).id,
        },
        data: {
          id_socket
        }
      })
    };

    async addUser({ id_room, id_socket, id_connected }: UserRoomAddUser) {
      return await prisma.userRoom.create({
        data: {
          id_room,
          id_socket,
          id_connected,
        }
      })
    }

    async isInUserRoom({ id_room, id_connected }: UserRoomUserIsInUserRoom) {
      const users = await prisma.userRoom.findFirst({
        where: {
          id_room,
          id_connected
        }
      });

      return users;
    }

    

  }