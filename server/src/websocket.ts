import { io } from "./http";
import { PrismaRoomsRepository } from "./repositories/prisma/rooms/prisma-rooms-repository";
import { PrismaAlunosRepository } from "./repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaProfessoresRepository } from "./repositories/prisma/professores/prisma-professores-repository";
import { PrismaMessagesRepository } from "./repositories/prisma/messages/prisma-messages-repository";
import { PrismaEscolaUsersRepository } from "./repositories/prisma/escolas/prisma-escolas-users-repository";
import { FindByNameRoomService } from "./services/rooms/FindRoomByNameService";
import { CreateRoomService } from "./services/rooms/CreateRoomService";
import { CreateMessageService } from "./services/messages/CreateMessageService";

interface definitionInterface{
  (message:string):void;
}

io.on("connection", (socket) => {
    console.log("a user connected");

    const prismaRoomsRepository = new PrismaRoomsRepository();
    const prismaMessagesRepository = new PrismaMessagesRepository();
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();    

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

      console.log(data);
      console.log(socket.id);

      const id_name = data.id_professor + data.id_aluno;

      // Buscando se a sala existe
      const prismaAlunosRepository = new PrismaAlunosRepository();
      const prismaProfessoresRepository = new PrismaProfessoresRepository();
      const findRoomService = new FindByNameRoomService(prismaRoomsRepository);

      // Buscando a sala
      let room = await findRoomService.execute(id_name)

      // Se ela existir, conecta o aluno a sala
      if (room) {

        console.log("Entrou na sala")

        // Conectando o aluno a sala
        socket.join(Object(room).id_name);

        // Sempre que houver reload, um novo socket é criado
        // Podem existir duplicatas
        // Verificando se o usuário já está na lista e se está na mesma sala

        // Em breve ...

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
        Object(room).id,
      );

    });
  
    socket.on("send_message", async (data, callback:definitionInterface) => {
      console.log("received message in server side", data);
      io.emit("received_message", data);

      // Salvando a mensagem no banco
      const createMessageService = new CreateMessageService(prismaRoomsRepository, prismaEscolaUsersRepository, prismaMessagesRepository);
      const message = await createMessageService.execute({
        id_room: data[0].user.id_sala,
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

  // A chamada portabilidade numérica, o direito de migrar de uma operadora de serviços telefônicos 
  // para outra mantendo o próprio número, foi implementada em todo o Brasil no início de 2009. 
  // Até maio, já haviam sido registrados 1.227.345 solicitações de clientes, das quais 804.448 (65,54%) 
  // eram referentes a celulares (telefonia móvel) e 442.897 (34,46%) correspondiam a linhas fixas. 
  // Desse total, 857.871 já haviam sido atendidas, sendo 614.321 (71,61%) concernentes a celulares e 243.550 (28,39%) 
  // correspondentes a linhas fixas. Ao que parece, os usuários de celulares são os mais insatisfeitos, 
  // mas os de linhas fixas têm mais dificuldade em serem atendidos pelas empresas.