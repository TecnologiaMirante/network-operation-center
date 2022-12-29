import { io } from "./http";
import { PrismaRoomsRepository } from "./repositories/prisma/rooms/prisma-rooms-repository";
import { PrismaAlunosRepository } from "./repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaProfessoresRepository } from "./repositories/prisma/professores/prisma-professores-repository";
import { PrismaMessagesRepository } from "./repositories/prisma/messages/prisma-messages-repository";
import { PrismaEscolaUsersRepository } from "./repositories/prisma/escolas/prisma-escolas-users-repository";
import { FindByNameRoomService } from "./services/rooms/FindRoomByNameService";
import { CreateRoomService } from "./services/rooms/CreateRoomService";
import { CreateMessageService } from "./services/messages/CreateMessageService";
import { GetMessagesByRoomService } from "./services/messages/GetMessagesByRoomService";

interface definitionInterface2{
  (message:string):void;
}

type User = {
  _id: string;
}

type Message = {
  _id: string;
  text: string;
  createdAt: Date;
  user: User;
}

type definitionInterfaceBase = {
  room_id: string;
  messages: Message[] | null;
}

interface definitionInterface{
  (messages: definitionInterfaceBase): void;
}

interface RoomUser {
  socket_id: string,
  username: string,
  room: string
}

const users: RoomUser[] = [];

io.on("connection", (socket) => {

    const prismaRoomsRepository = new PrismaRoomsRepository();
    const prismaMessagesRepository = new PrismaMessagesRepository();
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();   

    let result: definitionInterfaceBase;

    // Teste
    // socket.on("update item", (arg1: number, arg2: number, callback: definitionInterface) => {
    //   console.log(arg1); // 1
    //   console.log(arg2); // { name: "updated" }
    //   callback(
    //     "ok"
    //   );
    // });

    // Quando o aluno se conectar, o socket vai receber o id dele e o do professor
    socket.on("select_room", async (data, callback:definitionInterface) => {

      const id_name = data.id_professor + data.id_aluno;

      const prismaAlunosRepository = new PrismaAlunosRepository();
      const prismaProfessoresRepository = new PrismaProfessoresRepository();
      const findRoomService = new FindByNameRoomService(prismaRoomsRepository);

      // Buscando a sala
      let room = await findRoomService.execute({id_name});

      // Se ela existir, conecta o aluno a sala
      if (room) {

        // Conectando o aluno a sala
        socket.join(Object(room).id_name);

        // Verificando se o usuário já está na lista e se está na mesma sala
        const userInRoom = users.find(user => user.username === data.id_aluno && user.room === Object(room).id);
         
        // Se existir
        if (userInRoom) {
          userInRoom.socket_id = socket.id;

        }

        else {
          users.push({
            username: data.id_aluno,
            socket_id: socket.id,
            room: Object(room).id
          })
        }

        // Sempre que houver reload, um novo socket é criado
        // Podem existir duplicatas
        // Verificando se o usuário já está na lista e se está na mesma sala
        // Em breve ...

        // Variável para formatar a saída das mensagens
        const final_messages: Message[] = [];

        // Pegando todas as mensagens da sala
        const messsages_raw = await getMessagesRoomFunction(Object(room).id, prismaMessagesRepository, prismaRoomsRepository);
        const mes = [...Object.values(messsages_raw)];

        // Percorrendo as mensagens da sala
        for (let msg of mes) {
          let msg_aux: Message = {
            _id: msg.id,
            text: msg.text,
            createdAt: msg.created_at,
            user: {
              _id: msg.id_user,
            }
          }

          final_messages.push(msg_aux);
        }

        result = {
          room_id: Object(room).id,
          messages: final_messages
        }
        
      }

      // Se não existir, cria a sala como id do aluno e do professor
      else {
        const createRoomService = new CreateRoomService(prismaRoomsRepository, prismaAlunosRepository, prismaProfessoresRepository);
        
        room = await createRoomService.execute({
          id_aluno: data.id_aluno,
          id_professor: data.id_professor,
          id_name
        });
      }

      console.log(users)

      callback(
        result
      );

    });
  
    socket.on("send_message", async (data, callback:definitionInterface2) => {
      
      io.emit("received_message", data);

      // Salvando a mensagem no banco
      const createMessageService = new CreateMessageService(prismaRoomsRepository, prismaEscolaUsersRepository, prismaMessagesRepository);
      const message = await createMessageService.execute({
        id_room: data[0].user._idSala,
        id_user: data[0].user._id, 
        text: data[0].text
      });

      if (message instanceof Error) {
        return new Error("Erro ao criar a mensagem");
      }

      callback("Message Receive")
    });
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  async function getMessagesRoomFunction(id_room: string, prismaMessagesRepository: PrismaMessagesRepository, prismaRoomsRepository: PrismaRoomsRepository) {
    const getMessagesByRoom = new GetMessagesByRoomService(prismaRoomsRepository, prismaMessagesRepository);

    const messages = await getMessagesByRoom.execute({
      id_room
    });

    return messages;
  }