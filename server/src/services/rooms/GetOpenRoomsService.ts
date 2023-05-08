import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { UserRoomsRepository } from "../../repositories/interfaces/rooms/user-rooms/user-rooms-repository";
import { RoomsRepository } from "../../repositories/interfaces/rooms/rooms-repository";

interface GetOpenRoomsRequest {
    id_professor: string;
}

export class GetOpenRoomsService {

    constructor(
        private roomsRepository: RoomsRepository,
        private professoresRepository: ProfessoresRepository,

    ) {}

    async execute(request: GetOpenRoomsRequest) {

        const { id_professor } = request;

        if (!(await this.professoresRepository.find({ id: id_professor }))) {
            return new Error("Professor inexistente!");
        }

        const openRooms = await this.roomsRepository.getOpenRooms({
            id_professor
        })

        if (Object(openRooms).length == 0) {
            return new Error("Nenhuma sala aberta com este professor!");
        }

        return openRooms;
    }
}