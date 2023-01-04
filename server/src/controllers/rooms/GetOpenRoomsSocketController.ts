import { Request, Response } from "express";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { PrismaRoomsRepository } from "../../repositories/prisma/rooms/prisma-rooms-repository";
import { GetOpenRoomsService } from "../../services/rooms/GetOpenRoomsService";

class GetOpenRoomsController {
    async handle(req: Request, res: Response) {

        // Dados do parâmetro da requisição
        const { id_professor } = req.params;

        // Repositório do modelo do Prisma
        const prismaRoomsRepository = new PrismaRoomsRepository();
        const prismaProfessoresRepository = new PrismaProfessoresRepository();

        // Service
        const getOpenUserRoomsService = new GetOpenRoomsService(prismaRoomsRepository, prismaProfessoresRepository);

        // Executando o service
        const openRooms = await getOpenUserRoomsService.execute({
            id_professor
        })

        // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
        if(openRooms instanceof Error) {
            return res.status(400).send(openRooms.message);
        }

        // Retornando mensagem de sucesso para o usuário
        return res.status(200).send(
            openRooms
        )
    }
}

export { GetOpenRoomsController };