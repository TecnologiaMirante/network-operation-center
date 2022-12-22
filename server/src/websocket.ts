import { io } from "./http";
import { PrismaRoomsRepository } from "./repositories/prisma/rooms/prisma-rooms-repository";
import { PrismaAlunosRepository } from "./repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaProfessoresRepository } from "./repositories/prisma/professores/prisma-professores-repository";
import { FindByNameRoomService } from "./services/rooms/FindRoomByNameService";
import { CreateRoomService } from "./services/rooms/CreateRoomService";

interface definitionInterface{
  (message:string):void;
}

io.on("connection", (socket) => {
    console.log("a user connected");

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

      const id_name = data.id_professor + data.id_aluno;

      // Buscando se a sala existe
      const prismaRoomsRepository = new PrismaRoomsRepository();
      const prismaAlunosRepository = new PrismaAlunosRepository();
      const prismaProfessoresRepository = new PrismaProfessoresRepository();
      const findRoomService = new FindByNameRoomService(prismaRoomsRepository);

      // Buscando a sala
      let room = await findRoomService.execute(id_name)

      // Se ela existir, conecta o aluno a sala
      if (room) {

        // Conectando o aluno a sala
        socket.join(Object(room).id_name);

        // Verificando se o usuário já está na lista e se está na mesma sala

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
        "ok"
      );

    });
  
    socket.on("send_message", (data, callback:definitionInterface) => {
      console.log("received message in server side", data);
      io.emit("received_message", data);

      callback("Ok")
    });
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });