import { ProfessoresRepository } from "../../../repositories/interfaces/professores/professores-repository";
import { UserRoomsRepository } from "../../../repositories/interfaces/rooms/user-rooms/user-rooms-repository";

interface GetOpenUserRoomsSocketRequest {
    id_professor: string;
}

export class GetOpenUserRoomsSocketService {

    constructor(
        private userRoomsRepository: UserRoomsRepository,
        private professoresRepository: ProfessoresRepository,

    ) {}

    async execute(request: GetOpenUserRoomsSocketRequest) {

        const { id_professor } = request;

        if (!(await this.professoresRepository.find({ id: id_professor }))) {
            return new Error("Professor inexistente!");
        }

        const openRooms = await this.userRoomsRepository.getOpenUserRooms({
            id_professor
        })

        // if (Object.keys(openRooms).length == 0) {
        //     return new Error("Nenhuma sala encontrada!");
        // }

        return openRooms;
    }
}