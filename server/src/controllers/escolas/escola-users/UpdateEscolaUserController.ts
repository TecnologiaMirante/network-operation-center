import { Request, Response } from "express";
import { PrismaEscolaUserHasAddressRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-address-repository";
import { PrismaEscolasRepository } from "../../../repositories/prisma/escolas/prisma-escolas-repository";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { FindEscolaUserHasAddressService } from "../../../services/escolas/escola-user-has-address/FindEscolaUserHasAddresService";
import { UpdateEscolaUserHasAddressService } from "../../../services/escolas/escola-user-has-address/UpdateEscolaUserHasAddressService";
import { UpdateEscolaUserService } from "../../../services/escolas/escola-users/UpdateEscolaUserService";

class UpdateEscolaUserController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { name, email, cpf, mat, born, genre, avatar, id_responsavel, id_escola } = req.body;

    // Repositório do modelo do Prisma
    const prismaEscolasRepository = new PrismaEscolasRepository();
    const prismaEscolasUsersRepository = new PrismaEscolaUsersRepository();
    const prismaEscolasUsersHasAddressRepository = new PrismaEscolaUserHasAddressRepository();

    // Service da EscolaUser
    const updateEscolaUserService = new UpdateEscolaUserService(prismaEscolasUsersRepository, prismaEscolasRepository);

    // Executando o service
    const escolaUser = await updateEscolaUserService.execute({
      id,
      name, 
      email, 
      cpf, 
      mat, 
      born, 
      genre, 
      avatar, 
      id_responsavel,
      id_escola
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolaUser instanceof Error) {
      return res.status(400).send(escolaUser.message);
    }

    // // Momento em que começa a atualizar o ENDEREÇO ----------------------------------------------------------------

    // // Dados do corpo da requisição
    // const { state, city, district, number, street, address_continued, zip_code, reference } = req.body;

    // // Repositório do modelo do Prisma
    // const prismaEscolaUserHasAddressRepository = new PrismaEscolaUserHasAddressRepository();

    // // Instancia o service de buscar o endereço do usuario
    // const findEscolaUserHasAddressService = new FindEscolaUserHasAddressService(prismaEscolasUsersHasAddressRepository);
    
    // // Verificando se já possui endereço cadastrado
    // const userHasAddress = await findEscolaUserHasAddressService.execute({id_user: id})

    // // Se não der erro, então possui endereço, então atualiza o endereço ...
    // if (!(userHasAddress instanceof Error)) {
    //   const updateEscolaUserHasAddresService = new UpdateEscolaUserHasAddressService(prismaEscolaUserHasAddressRepository);
    //   await updateEscolaUserHasAddresService.execute({id: Object(userHasAddress).id, state, city, district, number, street, address_continued, zip_code, reference, id_user: id})
    // }

    // // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    // if(userHasAddress instanceof Error) {
    //   return res.status(400).send(userHasAddress.message);
    // }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateEscolaUserController };