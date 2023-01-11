import { prisma } from "../../../prisma";
import { MessageCreateData, MessagesRepository, MessageFind, MessageDelete, MessageUpdate, GetMessagesByRoom } from "../../interfaces/messages/messages-repository";

export class PrismaMessagesRepository implements MessagesRepository {

    async create( { id_room, id_user, text }: MessageCreateData ) {
      return await prisma.message.create({
        data: {
            id_room,
            id_user,
            text
        }
      })
    };
  
    async get() {
      const rooms = await prisma.message.findMany({});
      return rooms;
    }
    
    async getMessagesByRoom({ type, id_room }: GetMessagesByRoom ) {

      if (type == "web") {
        const rooms = await prisma.message.findMany({
          where: {
            id_room
          },
          orderBy: {
            created_at: "asc"
          }
        });
        return rooms;
      } 
      else {
        const rooms = await prisma.message.findMany({
          where: {
            id_room
          },
          orderBy: {
            created_at: "desc"
          }
        });
        return rooms;
      }
    }

    async find({ id }: MessageFind) {
      const room = await prisma.message.findUnique(
        {
          where: {
            id
          },
        }
      );
      return room;
    }
  
    async delete({ id }: MessageDelete) {
      await prisma.message.delete({
        where: {
          id,
        }
      });
    }
  
    async update({ id, id_room, id_user, text }: MessageUpdate) {
      return await prisma.message.update({
        where: {
          id
        },
        data: {
          id_room, id_user, text
        }
      })
    };
  }