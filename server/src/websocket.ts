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

type Message = {
  id: string;
  created_at: Date;
  updated_at: Date;
  id_room: string;
  id_user: string;
  text: string;
}

type definitionInterfaceBase = {
  room_id: string;
  messages: Message[] | null;
}

interface definitionInterface{
  (messages: definitionInterfaceBase): void;
}

interface definitionInterface2{
  (message:string):void;
}

io.on("connection", (socket) => {
    console.log("a user connected");

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
      let room = await findRoomService.execute(id_name);


      // Se ela existir, conecta o aluno a sala
      if (room) {

        console.log("Entrou na sala")

        // Conectando o aluno a sala
        socket.join(Object(room).id_name);

        // Sempre que houver reload, um novo socket é criado
        // Podem existir duplicatas
        // Verificando se o usuário já está na lista e se está na mesma sala

        // Em breve ...

        // Pegando todas as mensagens da sala
        const mes = await getMessagesRoomFunction(Object(room).id, prismaMessagesRepository, prismaRoomsRepository);
        // console.log(Object.values(mes)[0])

        const teste = [...Object.values(mes)]
        
        result = {
          room_id: Object(room).id,
          messages: teste
        }

      }

      // Se não existir, cria a sala como id do aluno e do professor
      else {
        console.log("Criando sala")
        const createRoomService = new CreateRoomService(prismaRoomsRepository, prismaAlunosRepository, prismaProfessoresRepository);
        
        room = await createRoomService.execute({
          id_aluno: data.id_aluno,
          id_professor: data.id_professor,
          id_name
        });
      }

      callback(
        result
      );

    });
  
    socket.on("send_message", async (data, callback:definitionInterface2) => {
      
      io.emit("received_message", data);

      console.log("\n\n\n *************************************************************************")
      console.log(data[0].user._idSala)
      console.log("\n\n\n *************************************************************************")

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