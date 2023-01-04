import { io } from "./http";
import { PrismaRoomsRepository } from "./repositories/prisma/rooms/prisma-rooms-repository";
import { PrismaUserRoomsRepository } from "./repositories/prisma/rooms/user-rooms/prisma-user-rooms-repository";
import { PrismaAlunosRepository } from "./repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaProfessoresRepository } from "./repositories/prisma/professores/prisma-professores-repository";
import { PrismaMessagesRepository } from "./repositories/prisma/messages/prisma-messages-repository";
import { PrismaEscolaUsersRepository } from "./repositories/prisma/escolas/prisma-escolas-users-repository";
import { FindByNameRoomService } from "./services/rooms/FindRoomByNameService";
import { AddUserRoomSocketService } from "./services/rooms/userRooms/AddUserRoomSocketService";
import { UserIsInRoomSocketService } from "./services/rooms/userRooms/UserIsInRoomSocketService";
import { CreateRoomService } from "./services/rooms/CreateRoomService";
import { CreateMessageService } from "./services/messages/CreateMessageService";
import { GetMessagesByRoomService } from "./services/messages/GetMessagesByRoomService";
import { UpdateRoomSocketService } from "./services/rooms/userRooms/UpdateUserRoomSocketService";
import { CreateUserRoomSocketService } from "./services/rooms/userRooms/CreateUserRoomSocketService";
import { GetOpenRoomsService } from "./services/rooms/GetOpenRoomsService";

// CASO DE USO: Entrar no chat de dúvidas com o professor
//
// DESCRIÇÃO: 
// O Aluno vai clicar no botão de "dúvidas" (APP) e duas situações podem acontecer:
// 1 - É a primeira vez que o aluno vai entrar na sala, então...
//      - A sala será criada
//      - O usuário será conectado a sala recém-criada
//      - Na visão do professor (WEB), este vai ter acesso imediamente as salas que forem criadas em tempo real
//
// 2 - Não é a primeira vez que o aluno vai entrar na sala, então...
//      - O usuário será conectado a sala


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

// Realizando conexão
io.on("connection", (socket) => {

    // Repositories
    const prismaRoomsRepository = new PrismaRoomsRepository();
    const prismaUserRoomsRepository = new PrismaUserRoomsRepository();
    const prismaMessagesRepository = new PrismaMessagesRepository();
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();   

    let result: definitionInterfaceBase;

    // Após o usuário se conectar (Aluno/Professor), o evento tem como parâmetros o "id_aluno" e o "id_professor"
    socket.on("select_room", async (data, callback:definitionInterface) => {

      const id_name = data.id_professor + data.id_aluno;

      const prismaAlunosRepository = new PrismaAlunosRepository();
      const prismaProfessoresRepository = new PrismaProfessoresRepository();

      const findRoomService = new FindByNameRoomService(prismaRoomsRepository);
      const userIsInRoomSocketService = new UserIsInRoomSocketService(prismaUserRoomsRepository, prismaRoomsRepository);
      const addUserRoomSocketService = new AddUserRoomSocketService(prismaUserRoomsRepository, prismaRoomsRepository);
      const updateRoomSocketService = new UpdateRoomSocketService(prismaUserRoomsRepository, prismaRoomsRepository);
      const createUserRoomSocketService = new CreateUserRoomSocketService(prismaUserRoomsRepository);

      // Buscando a sala selecionada
      let room = await findRoomService.execute({id_name});

      // Variável para formatar a saída das mensagens
      const final_messages: Message[] = [];

      // Se ela existir, conecta o aluno a sala
      if (room) {

        console.log(room)

        // Conectando o aluno a sala
        socket.join(Object(room).id_name);

        // Sempre que houver reload, um novo socket é criado
        // Podem existir duplicatas
        // Por isso, uma verificação de segurança é realizada

        // Verificando se o usuário já está na sala
        const isInRoom = await userIsInRoomSocketService.execute({ id_room: Object(room).id, id_connected: data.id_connected });
        
        // Se já estiver na sala...
        if(isInRoom) {
          // Atualiza o seu socket
          await updateRoomSocketService.execute({ id_room: Object(room).id, id_socket: socket.id, id_connected: data.id_connected });
        }

        // Se não...
        else {

          // Adiciona o usuário à sala
          await addUserRoomSocketService.execute({ id_room: Object(room).id, id_socket: socket.id, id_connected: data.id_connected });
        }

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
      }

      // Se ela não existir, cria a sala com o id do aluno e do professor
      else {
        
        const prismaProfessoresRepository = new PrismaProfessoresRepository();

        const createRoomService = new CreateRoomService(prismaRoomsRepository, prismaAlunosRepository, prismaProfessoresRepository);
        
        // Criando a sala
        room = await createRoomService.execute({
          id_aluno: data.id_aluno,
          id_professor: data.id_professor,
          id_name,
        });

        // Adicionando usuário na sala
        await createUserRoomSocketService.execute({
          id_room: Object(room).id,
          id_connected: data.id_connected,
          id_socket: socket.id,
        })

        // Neste momento do código iremos verificar as salas abertas e retorná-las para o professor em tempo real
        const getOpenUserRooms = new GetOpenRoomsService(prismaRoomsRepository, prismaProfessoresRepository);
        
        // Verificando as salas abertas com este professor
        const openRooms = await getOpenUserRooms.execute({
          id_professor: data.id_professor
        });

        // Enviando as salas abertas para o professor
        socket.emit("open_chats", openRooms);
      }

      
      // Organizando os dados finais
      result = {
        room_id: Object(room).id,
        messages: final_messages
      }
      
      console.log(result)

      // Retornando os dados por callback
      callback(
        result
      );

    });
  
    socket.on("send_message", async (data, callback:definitionInterface2) => {
      
      io.emit("received_message", data);

      console.log(data);

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