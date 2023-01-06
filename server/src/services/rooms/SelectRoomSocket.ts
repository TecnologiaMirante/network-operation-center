import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { RoomsRepository } from "../../repositories/interfaces/rooms/rooms-repository";
import { PrismaEscolaUsersRepository } from "../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { PrismaMessagesRepository } from "../../repositories/prisma/messages/prisma-messages-repository";
import { PrismaRoomsRepository } from "../../repositories/prisma/rooms/prisma-rooms-repository";
import { PrismaUserRoomsRepository } from "../../repositories/prisma/rooms/user-rooms/prisma-user-rooms-repository";
// import {} from ""

interface SelectRoomRequest {
    id_connected: string;
    id_professor: string;
    id_aluno: string;
}

export class SelectRoomSocket {

    constructor(
        // Repositories
        private roomsRepository: RoomsRepository,
        private alunosRepository: AlunosRepository,
        private professoresRepository: ProfessoresRepository,
    ) {}

    async execute(request: SelectRoomRequest) {

        

    }

}