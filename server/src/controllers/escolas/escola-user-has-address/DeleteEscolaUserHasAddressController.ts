import { Request, Response} from "express";
import { PrismaEscolaUserHasAddressRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-address-repository";
import { DeleteEscolaUserHasAddressService } from "../../../services/escolas/escola-user-has-address/DeleteEscolaUserHasAddressService";

class DeleteEscolaUserHasAddressController {
  async handle(req:Request, res:Response) {

    // Dados do parãmetro
    const { id_user } = req.params;

    // Repositório do modelo do Prisma
    const prismaEscolaUserHasAddressRepository = new PrismaEscolaUserHasAddressRepository();
    
    // Service do Tipo
    const findEscolaUserHasAddressService = new DeleteEscolaUserHasAddressService(prismaEscolaUserHasAddressRepository);

    // Executando o service
    const escolaUserHasAddress = await findEscolaUserHasAddressService.execute({id_user});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolaUserHasAddress instanceof Error) {
      return res.status(400).send(escolaUserHasAddress.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  };
}

export { DeleteEscolaUserHasAddressController };