import { Request, Response } from "express";
import { PrismaEscolaUserHasAddressRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-address-repository";
import { PrismaEscolasRepository } from "../../../repositories/prisma/escolas/prisma-escolas-repository";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { PrismaResponsaveisRepository } from "../../../repositories/prisma/responsaveis/prisma-responsaveis-repository";
import { CreateEscolaUserService } from "../../../services/escolas/escola-users/CreateEscolaUserService";
import { CreateEscolaUserHasAddressService } from "../../../services/escolas/escola-user-has-address/CreateEscolaUserHasAddressService";
import { PrismaEscolaUserHasPhonesRepository } from "../../../repositories/prisma/escolas/prisma-escola-user-has-phones-repository";
import { CreateEscolaUserHasPhonesService } from "../../../services/escolas/escola-user-has-phones/CreateEscolaUserHasPhonesService";
// import { NodemailerMailAdapter } from "../../../adapters/nodemailer/nodemailer-mail-adapter";

class CreateEscolaUserController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name, email, cpf, mat, born, genre, avatar, id_responsavel, id_escola } = req.body;

    // Repositório do modelo do Prisma
    const prismaEscolasRepository = new PrismaEscolasRepository();
    const prismaEscolasUsersRepository = new PrismaEscolaUsersRepository();
    const prismaResponsaveisRepository = new PrismaResponsaveisRepository();
    // const nodemailerMailAdapter = new NodemailerMailAdapter();

    // Service
    const createEscolaUserService = new CreateEscolaUserService(
      prismaEscolasUsersRepository, 
      prismaEscolasRepository, 
      prismaResponsaveisRepository, 
      // nodemailerMailAdapter
      );

    // Executando o service
    const escolaUser = await createEscolaUserService.execute({
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

    // Pegando o id do usuário
    const id_user = Object(escolaUser).id;

    // // Momento em que começa a cadastrar o ENDEREÇO ----------------------------------------------------------------
    
    // // Dados do corpo da requisição
    // const { state, city, district, number, street, address_continued, zip_code, reference }  = req.body;
    
    // // Repositório do modelo do Prisma
    // const prismaEscolaUserHasAddressRepository = new PrismaEscolaUserHasAddressRepository();

    // // Service
    // const createEscolaUserHasAddressService = new CreateEscolaUserHasAddressService(prismaEscolaUserHasAddressRepository,prismaEscolasUsersRepository);

    // const userHasAddress = createEscolaUserHasAddressService.execute({
    //   state, 
    //   city, 
    //   district, 
    //   number, 
    //   street, 
    //   address_continued, 
    //   zip_code, 
    //   reference, 
    //   id_user
    // })

    // if (userHasAddress instanceof Error) {
    //   return res.status(400).send(userHasAddress.message);
    // }

    // // Momento em que começa a cadastrar o TELEFONE ----------------------------------------------------------------

    // // Dados do corpo da requisição
    // const { phone } = req.body;

    // // Repositório do modelo do Prisma
    // const prismaEscolaUserHasPhonesRepository = new PrismaEscolaUserHasPhonesRepository();

    // // Service
    // const createEscolaUserHasPhoneService = new CreateEscolaUserHasPhonesService(prismaEscolaUserHasPhonesRepository, prismaEscolasUsersRepository);
    
    // if(phone) {

    //   // Cadastrando os telefones inseridos
    //   for (let ph of phone) {
  
    //     const userHasPhone = createEscolaUserHasPhoneService.execute({
    //       phone:ph,
    //       id_user
    //     })
    
    //     if (userHasPhone instanceof Error) {
    //       return res.status(400).send(userHasPhone.message);
    //     }
    //   } 
    // }


    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Usuário criado com sucesso!",
        data: escolaUser
      }
    );
  }
}

export { CreateEscolaUserController };